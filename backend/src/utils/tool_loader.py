import yaml
import logging
import os
from sqlalchemy.orm import Session
from src.models.all_models import Tool

logger = logging.getLogger("hackatomiq.loader")

def load_yaml_tools(file_path: str, db: Session):
    if not os.path.exists(file_path):
        logger.warning(f"Tools file not found at: {file_path}")
        return

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
            
        tools_list = data.get("tools", [])
        logger.info(f"🔄 Syncing {len(tools_list)} tools from YAML...")
        
        for t_def in tools_list:
            slug = t_def.get("id")
            if not slug: continue

            existing = db.query(Tool).filter(Tool.slug == slug).first()
            if existing:
                existing.name = t_def.get("label", slug)
                existing.command_structure = t_def.get("cmd", [])
                existing.args_schema = t_def.get("args", [])
                existing.output_config = t_def.get("out", {})
            else:
                new_tool = Tool(
                    slug=slug,
                    name=t_def.get("label", slug),
                    command_structure=t_def.get("cmd", []),
                    args_schema=t_def.get("args", []),
                    output_config=t_def.get("out", {}),
                    is_installed=True
                )
                db.add(new_tool)
        db.commit()
        logger.info("✅ Tools synced.")
    except Exception as e:
        logger.error(f"❌ Failed to load tools: {e}")
        db.rollback()
