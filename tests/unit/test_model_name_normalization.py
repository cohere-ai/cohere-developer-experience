import pytest

def normalize_model_identifier(model_name: str) -> str:
    """Trims whitespace and lowercases standard model family identifiers."""
    if not model_name:
        return ""
    return model_name.strip().lower()

def test_model_name_normalization_casing():
    assert normalize_model_identifier("Command-R-Plus") == "command-r-plus"
    assert normalize_model_identifier("command-r") == "command-r"

def test_model_name_normalization_whitespace():
    assert normalize_model_identifier("  command-light  ") == "command-light"
    assert normalize_model_identifier("") == ""
