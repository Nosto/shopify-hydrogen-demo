// Auto-generated from tree-sitter Bash v0.23.0
type BashTypes = {
  "_expression": {
    "type": "_expression",
    "named": true,
    "subtypes": [
      {
        "type": "_primary_expression",
        "named": true
      },
      {
        "type": "binary_expression",
        "named": true
      },
      {
        "type": "concatenation",
        "named": true
      },
      {
        "type": "parenthesized_expression",
        "named": true
      },
      {
        "type": "postfix_expression",
        "named": true
      },
      {
        "type": "ternary_expression",
        "named": true
      },
      {
        "type": "unary_expression",
        "named": true
      },
      {
        "type": "word",
        "named": true
      }
    ]
  },
  "_primary_expression": {
    "type": "_primary_expression",
    "named": true,
    "subtypes": [
      {
        "type": "ansi_c_string",
        "named": true
      },
      {
        "type": "arithmetic_expansion",
        "named": true
      },
      {
        "type": "brace_expression",
        "named": true
      },
      {
        "type": "command_substitution",
        "named": true
      },
      {
        "type": "expansion",
        "named": true
      },
      {
        "type": "number",
        "named": true
      },
      {
        "type": "process_substitution",
        "named": true
      },
      {
        "type": "raw_string",
        "named": true
      },
      {
        "type": "simple_expansion",
        "named": true
      },
      {
        "type": "string",
        "named": true
      },
      {
        "type": "translated_string",
        "named": true
      },
      {
        "type": "word",
        "named": true
      }
    ]
  },
  "_statement": {
    "type": "_statement",
    "named": true,
    "subtypes": [
      {
        "type": "c_style_for_statement",
        "named": true
      },
      {
        "type": "case_statement",
        "named": true
      },
      {
        "type": "command",
        "named": true
      },
      {
        "type": "compound_statement",
        "named": true
      },
      {
        "type": "declaration_command",
        "named": true
      },
      {
        "type": "for_statement",
        "named": true
      },
      {
        "type": "function_definition",
        "named": true
      },
      {
        "type": "if_statement",
        "named": true
      },
      {
        "type": "list",
        "named": true
      },
      {
        "type": "negated_command",
        "named": true
      },
      {
        "type": "pipeline",
        "named": true
      },
      {
        "type": "redirected_statement",
        "named": true
      },
      {
        "type": "subshell",
        "named": true
      },
      {
        "type": "test_command",
        "named": true
      },
      {
        "type": "unset_command",
        "named": true
      },
      {
        "type": "variable_assignment",
        "named": true
      },
      {
        "type": "variable_assignments",
        "named": true
      },
      {
        "type": "while_statement",
        "named": true
      }
    ]
  },
  "arithmetic_expansion": {
    "type": "arithmetic_expansion",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "binary_expression",
          "named": true
        },
        {
          "type": "command_substitution",
          "named": true
        },
        {
          "type": "expansion",
          "named": true
        },
        {
          "type": "number",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "simple_expansion",
          "named": true
        },
        {
          "type": "string",
          "named": true
        },
        {
          "type": "subscript",
          "named": true
        },
        {
          "type": "ternary_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_name",
          "named": true
        }
      ]
    }
  },
  "array": {
    "type": "array",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_primary_expression",
          "named": true
        },
        {
          "type": "concatenation",
          "named": true
        }
      ]
    }
  },
  "binary_expression": {
    "type": "binary_expression",
    "named": true,
    "fields": {
      "left": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "_expression",
            "named": true
          },
          {
            "type": "command_substitution",
            "named": true
          },
          {
            "type": "expansion",
            "named": true
          },
          {
            "type": "number",
            "named": true
          },
          {
            "type": "simple_expansion",
            "named": true
          },
          {
            "type": "string",
            "named": true
          },
          {
            "type": "subscript",
            "named": true
          },
          {
            "type": "variable_name",
            "named": true
          }
        ]
      },
      "operator": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "test_operator",
            "named": true
          }
        ]
      },
      "right": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_expression",
            "named": true
          },
          {
            "type": "command_substitution",
            "named": true
          },
          {
            "type": "expansion",
            "named": true
          },
          {
            "type": "extglob_pattern",
            "named": true
          },
          {
            "type": "number",
            "named": true
          },
          {
            "type": "regex",
            "named": true
          },
          {
            "type": "simple_expansion",
            "named": true
          },
          {
            "type": "string",
            "named": true
          },
          {
            "type": "subscript",
            "named": true
          },
          {
            "type": "variable_name",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "binary_expression",
          "named": true
        },
        {
          "type": "expansion",
          "named": true
        },
        {
          "type": "number",
          "named": true
        },
        {
          "type": "variable_name",
          "named": true
        }
      ]
    }
  },
  "brace_expression": {
    "type": "brace_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "number",
          "named": true
        }
      ]
    }
  },
  "c_style_for_statement": {
    "type": "c_style_for_statement",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "compound_statement",
            "named": true
          },
          {
            "type": "do_group",
            "named": true
          }
        ]
      },
      "condition": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "binary_expression",
            "named": true
          },
          {
            "type": "command_substitution",
            "named": true
          },
          {
            "type": "expansion",
            "named": true
          },
          {
            "type": "number",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "simple_expansion",
            "named": true
          },
          {
            "type": "string",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          },
          {
            "type": "variable_assignment",
            "named": true
          },
          {
            "type": "word",
            "named": true
          }
        ]
      },
      "initializer": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "binary_expression",
            "named": true
          },
          {
            "type": "command_substitution",
            "named": true
          },
          {
            "type": "expansion",
            "named": true
          },
          {
            "type": "number",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "simple_expansion",
            "named": true
          },
          {
            "type": "string",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          },
          {
            "type": "variable_assignment",
            "named": true
          },
          {
            "type": "word",
            "named": true
          }
        ]
      },
      "update": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "binary_expression",
            "named": true
          },
          {
            "type": "command_substitution",
            "named": true
          },
          {
            "type": "expansion",
            "named": true
          },
          {
            "type": "number",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "simple_expansion",
            "named": true
          },
          {
            "type": "string",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          },
          {
            "type": "variable_assignment",
            "named": true
          },
          {
            "type": "word",
            "named": true
          }
        ]
      }
    }
  },
  "case_item": {
    "type": "case_item",
    "named": true,
    "fields": {
      "fallthrough": {
        "multiple": false,
        "required": false,
        "types": []
      },
      "termination": {
        "multiple": false,
        "required": false,
        "types": []
      },
      "value": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_primary_expression",
            "named": true
          },
          {
            "type": "concatenation",
            "named": true
          },
          {
            "type": "extglob_pattern",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_statement",
          "named": true
        }
      ]
    }
  },
  "case_statement": {
    "type": "case_statement",
    "named": true,
    "fields": {
      "value": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_primary_expression",
            "named": true
          },
          {
            "type": "concatenation",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "case_item",
          "named": true
        }
      ]
    }
  },
  "command": {
    "type": "command",
    "named": true,
    "fields": {
      "argument": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_primary_expression",
            "named": true
          },
          {
            "type": "concatenation",
            "named": true
          },
          {
            "type": "regex",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "command_name",
            "named": true
          }
        ]
      },
      "redirect": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "file_redirect",
            "named": true
          },
          {
            "type": "herestring_redirect",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "subshell",
          "named": true
        },
        {
          "type": "variable_assignment",
          "named": true
        }
      ]
    }
  },
  "command_name": {
    "type": "command_name",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "_primary_expression",
          "named": true
        },
        {
          "type": "concatenation",
          "named": true
        }
      ]
    }
  },
  "command_substitution": {
    "type": "command_substitution",
    "named": true,
    "fields": {
      "redirect": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "file_redirect",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_statement",
          "named": true
        }
      ]
    }
  },
  "compound_statement": {
    "type": "compound_statement",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_statement",
          "named": true
        }
      ]
    }
  },
  "concatenation": {
    "type": "concatenation",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_primary_expression",
          "named": true
        },
        {
          "type": "array",
          "named": true
        },
        {
          "type": "variable_name",
          "named": true
        }
      ]
    }
  },
  "declaration_command": {
    "type": "declaration_command",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_primary_expression",
          "named": true
        },
        {
          "type": "concatenation",
          "named": true
        },
        {
          "type": "variable_assignment",
          "named": true
        },
        {
          "type": "variable_name",
          "named": true
        }
      ]
    }
  },
  "do_group": {
    "type": "do_group",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_statement",
          "named": true
        }
      ]
    }
  },
  "elif_clause": {
    "type": "elif_clause",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_statement",
          "named": true
        }
      ]
    }
  },
  "else_clause": {
    "type": "else_clause",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_statement",
          "named": true
        }
      ]
    }
  },
  "expansion": {
    "type": "expansion",
    "named": true,
    "fields": {
      "operator": {
        "multiple": true,
        "required": false,
        "types": []
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_primary_expression",
          "named": true
        },
        {
          "type": "array",
          "named": true
        },
        {
          "type": "binary_expression",
          "named": true
        },
        {
          "type": "concatenation",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "regex",
          "named": true
        },
        {
          "type": "special_variable_name",
          "named": true
        },
        {
          "type": "subscript",
          "named": true
        },
        {
          "type": "variable_name",
          "named": true
        }
      ]
    }
  },
  "file_redirect": {
    "type": "file_redirect",
    "named": true,
    "fields": {
      "descriptor": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "file_descriptor",
            "named": true
          }
        ]
      },
      "destination": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_primary_expression",
            "named": true
          },
          {
            "type": "concatenation",
            "named": true
          }
        ]
      }
    }
  },
  "for_statement": {
    "type": "for_statement",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "do_group",
            "named": true
          }
        ]
      },
      "value": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_primary_expression",
            "named": true
          },
          {
            "type": "concatenation",
            "named": true
          }
        ]
      },
      "variable": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "variable_name",
            "named": true
          }
        ]
      }
    }
  },
  "function_definition": {
    "type": "function_definition",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "compound_statement",
            "named": true
          },
          {
            "type": "if_statement",
            "named": true
          },
          {
            "type": "subshell",
            "named": true
          },
          {
            "type": "test_command",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "word",
            "named": true
          }
        ]
      },
      "redirect": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "file_redirect",
            "named": true
          },
          {
            "type": "herestring_redirect",
            "named": true
          }
        ]
      }
    }
  },
  "heredoc_body": {
    "type": "heredoc_body",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "command_substitution",
          "named": true
        },
        {
          "type": "expansion",
          "named": true
        },
        {
          "type": "heredoc_content",
          "named": true
        },
        {
          "type": "simple_expansion",
          "named": true
        }
      ]
    }
  },
  "heredoc_redirect": {
    "type": "heredoc_redirect",
    "named": true,
    "fields": {
      "argument": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_primary_expression",
            "named": true
          },
          {
            "type": "concatenation",
            "named": true
          }
        ]
      },
      "descriptor": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "file_descriptor",
            "named": true
          }
        ]
      },
      "operator": {
        "multiple": false,
        "required": false,
        "types": []
      },
      "redirect": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "file_redirect",
            "named": true
          },
          {
            "type": "herestring_redirect",
            "named": true
          }
        ]
      },
      "right": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "_statement",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "heredoc_body",
          "named": true
        },
        {
          "type": "heredoc_end",
          "named": true
        },
        {
          "type": "heredoc_start",
          "named": true
        },
        {
          "type": "pipeline",
          "named": true
        }
      ]
    }
  },
  "herestring_redirect": {
    "type": "herestring_redirect",
    "named": true,
    "fields": {
      "descriptor": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "file_descriptor",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "_primary_expression",
          "named": true
        },
        {
          "type": "concatenation",
          "named": true
        }
      ]
    }
  },
  "if_statement": {
    "type": "if_statement",
    "named": true,
    "fields": {
      "condition": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_statement",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_statement",
          "named": true
        },
        {
          "type": "elif_clause",
          "named": true
        },
        {
          "type": "else_clause",
          "named": true
        }
      ]
    }
  },
  "list": {
    "type": "list",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_statement",
          "named": true
        }
      ]
    }
  },
  "negated_command": {
    "type": "negated_command",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "command",
          "named": true
        },
        {
          "type": "subshell",
          "named": true
        },
        {
          "type": "test_command",
          "named": true
        },
        {
          "type": "variable_assignment",
          "named": true
        }
      ]
    }
  },
  "number": {
    "type": "number",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "command_substitution",
          "named": true
        },
        {
          "type": "expansion",
          "named": true
        }
      ]
    }
  },
  "parenthesized_expression": {
    "type": "parenthesized_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_expression",
          "named": true
        },
        {
          "type": "command_substitution",
          "named": true
        },
        {
          "type": "expansion",
          "named": true
        },
        {
          "type": "number",
          "named": true
        },
        {
          "type": "simple_expansion",
          "named": true
        },
        {
          "type": "string",
          "named": true
        },
        {
          "type": "subscript",
          "named": true
        },
        {
          "type": "variable_assignment",
          "named": true
        },
        {
          "type": "variable_name",
          "named": true
        }
      ]
    }
  },
  "pipeline": {
    "type": "pipeline",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_statement",
          "named": true
        }
      ]
    }
  },
  "postfix_expression": {
    "type": "postfix_expression",
    "named": true,
    "fields": {
      "operator": {
        "multiple": false,
        "required": true,
        "types": []
      }
    },
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "_expression",
          "named": true
        },
        {
          "type": "command_substitution",
          "named": true
        },
        {
          "type": "expansion",
          "named": true
        },
        {
          "type": "number",
          "named": true
        },
        {
          "type": "simple_expansion",
          "named": true
        },
        {
          "type": "string",
          "named": true
        },
        {
          "type": "subscript",
          "named": true
        },
        {
          "type": "variable_name",
          "named": true
        }
      ]
    }
  },
  "process_substitution": {
    "type": "process_substitution",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_statement",
          "named": true
        }
      ]
    }
  },
  "program": {
    "type": "program",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_statement",
          "named": true
        }
      ]
    }
  },
  "redirected_statement": {
    "type": "redirected_statement",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "_statement",
            "named": true
          }
        ]
      },
      "redirect": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "file_redirect",
            "named": true
          },
          {
            "type": "heredoc_redirect",
            "named": true
          },
          {
            "type": "herestring_redirect",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "herestring_redirect",
          "named": true
        }
      ]
    }
  },
  "simple_expansion": {
    "type": "simple_expansion",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "special_variable_name",
          "named": true
        },
        {
          "type": "variable_name",
          "named": true
        }
      ]
    }
  },
  "string": {
    "type": "string",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "arithmetic_expansion",
          "named": true
        },
        {
          "type": "command_substitution",
          "named": true
        },
        {
          "type": "expansion",
          "named": true
        },
        {
          "type": "simple_expansion",
          "named": true
        },
        {
          "type": "string_content",
          "named": true
        }
      ]
    }
  },
  "subscript": {
    "type": "subscript",
    "named": true,
    "fields": {
      "index": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_primary_expression",
            "named": true
          },
          {
            "type": "binary_expression",
            "named": true
          },
          {
            "type": "concatenation",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "variable_name",
            "named": true
          }
        ]
      }
    }
  },
  "subshell": {
    "type": "subshell",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_statement",
          "named": true
        }
      ]
    }
  },
  "ternary_expression": {
    "type": "ternary_expression",
    "named": true,
    "fields": {
      "alternative": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_expression",
            "named": true
          },
          {
            "type": "command_substitution",
            "named": true
          },
          {
            "type": "expansion",
            "named": true
          },
          {
            "type": "number",
            "named": true
          },
          {
            "type": "simple_expansion",
            "named": true
          },
          {
            "type": "string",
            "named": true
          },
          {
            "type": "subscript",
            "named": true
          },
          {
            "type": "variable_name",
            "named": true
          }
        ]
      },
      "condition": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_expression",
            "named": true
          },
          {
            "type": "command_substitution",
            "named": true
          },
          {
            "type": "expansion",
            "named": true
          },
          {
            "type": "number",
            "named": true
          },
          {
            "type": "simple_expansion",
            "named": true
          },
          {
            "type": "string",
            "named": true
          },
          {
            "type": "subscript",
            "named": true
          },
          {
            "type": "variable_name",
            "named": true
          }
        ]
      },
      "consequence": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_expression",
            "named": true
          },
          {
            "type": "command_substitution",
            "named": true
          },
          {
            "type": "expansion",
            "named": true
          },
          {
            "type": "number",
            "named": true
          },
          {
            "type": "simple_expansion",
            "named": true
          },
          {
            "type": "string",
            "named": true
          },
          {
            "type": "subscript",
            "named": true
          },
          {
            "type": "variable_name",
            "named": true
          }
        ]
      }
    }
  },
  "test_command": {
    "type": "test_command",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "_expression",
          "named": true
        },
        {
          "type": "redirected_statement",
          "named": true
        }
      ]
    }
  },
  "translated_string": {
    "type": "translated_string",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "string",
          "named": true
        }
      ]
    }
  },
  "unary_expression": {
    "type": "unary_expression",
    "named": true,
    "fields": {
      "operator": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "test_operator",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "_expression",
          "named": true
        },
        {
          "type": "command_substitution",
          "named": true
        },
        {
          "type": "expansion",
          "named": true
        },
        {
          "type": "number",
          "named": true
        },
        {
          "type": "simple_expansion",
          "named": true
        },
        {
          "type": "string",
          "named": true
        },
        {
          "type": "subscript",
          "named": true
        },
        {
          "type": "variable_name",
          "named": true
        }
      ]
    }
  },
  "unset_command": {
    "type": "unset_command",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_primary_expression",
          "named": true
        },
        {
          "type": "concatenation",
          "named": true
        },
        {
          "type": "variable_name",
          "named": true
        }
      ]
    }
  },
  "variable_assignment": {
    "type": "variable_assignment",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "subscript",
            "named": true
          },
          {
            "type": "variable_name",
            "named": true
          }
        ]
      },
      "value": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_primary_expression",
            "named": true
          },
          {
            "type": "array",
            "named": true
          },
          {
            "type": "binary_expression",
            "named": true
          },
          {
            "type": "concatenation",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          },
          {
            "type": "variable_assignment",
            "named": true
          }
        ]
      }
    }
  },
  "variable_assignments": {
    "type": "variable_assignments",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "variable_assignment",
          "named": true
        }
      ]
    }
  },
  "while_statement": {
    "type": "while_statement",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "do_group",
            "named": true
          }
        ]
      },
      "condition": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_statement",
            "named": true
          }
        ]
      }
    }
  },
  "word": {
    "type": "word",
    "named": true,
    "fields": {}
  },
  "ansi_c_string": {
    "type": "ansi_c_string",
    "named": true
  },
  "comment": {
    "type": "comment",
    "named": true
  },
  "extglob_pattern": {
    "type": "extglob_pattern",
    "named": true
  },
  "file_descriptor": {
    "type": "file_descriptor",
    "named": true
  },
  "heredoc_content": {
    "type": "heredoc_content",
    "named": true
  },
  "heredoc_end": {
    "type": "heredoc_end",
    "named": true
  },
  "heredoc_start": {
    "type": "heredoc_start",
    "named": true
  },
  "raw_string": {
    "type": "raw_string",
    "named": true
  },
  "regex": {
    "type": "regex",
    "named": true
  },
  "special_variable_name": {
    "type": "special_variable_name",
    "named": true
  },
  "string_content": {
    "type": "string_content",
    "named": true
  },
  "test_operator": {
    "type": "test_operator",
    "named": true
  },
  "variable_name": {
    "type": "variable_name",
    "named": true
  }
};
export default BashTypes;