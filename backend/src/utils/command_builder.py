import shlex
from typing import List, Dict, Any, Union

class CommandBuilder:
    @staticmethod
    def build_command(tool_def: Dict[str, Any], user_inputs: Dict[str, Any]) -> str:
        cmd_parts = []
        
        # Merge defaults
        active_params = {}
        for arg_def in tool_def.get("args_schema", []):
            name = arg_def["name"]
            default = arg_def.get("default")
            active_params[name] = user_inputs.get(name, default)

        # Process structure
        raw_cmd = tool_def.get("command_structure", [])
        for part in raw_cmd:
            if isinstance(part, str):
                rendered = CommandBuilder._render_template(part, active_params)
                cmd_parts.append(rendered)
            elif isinstance(part, dict) and part.get("kind") == "arg":
                arg_str = CommandBuilder._process_arg_node(part, active_params)
                if arg_str:
                    cmd_parts.append(arg_str)

        return " ".join(cmd_parts)

    @staticmethod
    def _render_template(template: str, params: Dict[str, Any]) -> str:
        for key, val in params.items():
            token = f"{{{{{key}}}}}"
            if token in template:
                template = template.replace(token, str(val))
        return template

    @staticmethod
    def _process_arg_node(node: Dict[str, Any], params: Dict[str, Any]) -> Union[str, None]:
        name = node.get("name")
        flag = node.get("flag", "")
        mode = node.get("mode", "value")
        val = params.get(name)
        
        if val in [None, "", []]: return None
        if mode == "bool": return flag if val else None
        
        if mode == "join":
            sep = node.get("sep", ",")
            joined = sep.join([str(v) for v in val]) if isinstance(val, list) else str(val)
            safe_val = shlex.quote(joined)
            return f"{flag} {safe_val}"
            
        # Default value mode
        safe_val = shlex.quote(str(val))
        return f"{flag} {safe_val}" if flag else safe_val
