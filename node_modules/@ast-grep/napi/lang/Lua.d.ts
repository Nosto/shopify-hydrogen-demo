// Auto-generated from tree-sitter Lua v0.2.0
type LuaTypes = {
  "declaration": {
    "type": "declaration",
    "named": true,
    "subtypes": [
      {
        "type": "function_declaration",
        "named": true
      },
      {
        "type": "variable_declaration",
        "named": true
      }
    ]
  },
  "expression": {
    "type": "expression",
    "named": true,
    "subtypes": [
      {
        "type": "binary_expression",
        "named": true
      },
      {
        "type": "false",
        "named": true
      },
      {
        "type": "function_call",
        "named": true
      },
      {
        "type": "function_definition",
        "named": true
      },
      {
        "type": "nil",
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
        "type": "string",
        "named": true
      },
      {
        "type": "table_constructor",
        "named": true
      },
      {
        "type": "true",
        "named": true
      },
      {
        "type": "unary_expression",
        "named": true
      },
      {
        "type": "vararg_expression",
        "named": true
      },
      {
        "type": "variable",
        "named": true
      }
    ]
  },
  "statement": {
    "type": "statement",
    "named": true,
    "subtypes": [
      {
        "type": "assignment_statement",
        "named": true
      },
      {
        "type": "break_statement",
        "named": true
      },
      {
        "type": "declaration",
        "named": true
      },
      {
        "type": "do_statement",
        "named": true
      },
      {
        "type": "empty_statement",
        "named": true
      },
      {
        "type": "for_statement",
        "named": true
      },
      {
        "type": "function_call",
        "named": true
      },
      {
        "type": "goto_statement",
        "named": true
      },
      {
        "type": "if_statement",
        "named": true
      },
      {
        "type": "label_statement",
        "named": true
      },
      {
        "type": "repeat_statement",
        "named": true
      },
      {
        "type": "while_statement",
        "named": true
      }
    ]
  },
  "variable": {
    "type": "variable",
    "named": true,
    "subtypes": [
      {
        "type": "bracket_index_expression",
        "named": true
      },
      {
        "type": "dot_index_expression",
        "named": true
      },
      {
        "type": "identifier",
        "named": true
      }
    ]
  },
  "arguments": {
    "type": "arguments",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "expression",
          "named": true
        }
      ]
    }
  },
  "assignment_statement": {
    "type": "assignment_statement",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "expression_list",
          "named": true
        },
        {
          "type": "variable_list",
          "named": true
        }
      ]
    }
  },
  "attribute": {
    "type": "attribute",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "identifier",
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
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      },
      "right": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      }
    }
  },
  "block": {
    "type": "block",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "return_statement",
          "named": true
        },
        {
          "type": "statement",
          "named": true
        }
      ]
    }
  },
  "bracket_index_expression": {
    "type": "bracket_index_expression",
    "named": true,
    "fields": {
      "field": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      },
      "table": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "function_call",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      }
    }
  },
  "chunk": {
    "type": "chunk",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "hash_bang_line",
          "named": true
        },
        {
          "type": "return_statement",
          "named": true
        },
        {
          "type": "statement",
          "named": true
        }
      ]
    }
  },
  "comment": {
    "type": "comment",
    "named": true,
    "fields": {
      "content": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "comment_content",
            "named": true
          }
        ]
      },
      "end": {
        "multiple": false,
        "required": false,
        "types": []
      },
      "start": {
        "multiple": false,
        "required": true,
        "types": []
      }
    }
  },
  "do_statement": {
    "type": "do_statement",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "block",
            "named": true
          }
        ]
      }
    }
  },
  "dot_index_expression": {
    "type": "dot_index_expression",
    "named": true,
    "fields": {
      "field": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "table": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "function_call",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      }
    }
  },
  "else_statement": {
    "type": "else_statement",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "block",
            "named": true
          }
        ]
      }
    }
  },
  "elseif_statement": {
    "type": "elseif_statement",
    "named": true,
    "fields": {
      "condition": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      },
      "consequence": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "block",
            "named": true
          }
        ]
      }
    }
  },
  "empty_statement": {
    "type": "empty_statement",
    "named": true,
    "fields": {}
  },
  "expression_list": {
    "type": "expression_list",
    "named": true,
    "fields": {
      "value": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "expression",
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
          "type": "expression",
          "named": true
        }
      ]
    }
  },
  "field": {
    "type": "field",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "value": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      }
    }
  },
  "for_generic_clause": {
    "type": "for_generic_clause",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "expression_list",
          "named": true
        },
        {
          "type": "variable_list",
          "named": true
        }
      ]
    }
  },
  "for_numeric_clause": {
    "type": "for_numeric_clause",
    "named": true,
    "fields": {
      "end": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "start": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      },
      "step": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "expression",
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
        "required": false,
        "types": [
          {
            "type": "block",
            "named": true
          }
        ]
      },
      "clause": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "for_generic_clause",
            "named": true
          },
          {
            "type": "for_numeric_clause",
            "named": true
          }
        ]
      }
    }
  },
  "function_call": {
    "type": "function_call",
    "named": true,
    "fields": {
      "arguments": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "arguments",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "function_call",
            "named": true
          },
          {
            "type": "method_index_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      }
    }
  },
  "function_declaration": {
    "type": "function_declaration",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "block",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "dot_index_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "method_index_expression",
            "named": true
          }
        ]
      },
      "parameters": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "parameters",
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
        "required": false,
        "types": [
          {
            "type": "block",
            "named": true
          }
        ]
      },
      "parameters": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "parameters",
            "named": true
          }
        ]
      }
    }
  },
  "goto_statement": {
    "type": "goto_statement",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "identifier",
          "named": true
        }
      ]
    }
  },
  "if_statement": {
    "type": "if_statement",
    "named": true,
    "fields": {
      "alternative": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "else_statement",
            "named": true
          },
          {
            "type": "elseif_statement",
            "named": true
          }
        ]
      },
      "condition": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      },
      "consequence": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "block",
            "named": true
          }
        ]
      }
    }
  },
  "label_statement": {
    "type": "label_statement",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "identifier",
          "named": true
        }
      ]
    }
  },
  "method_index_expression": {
    "type": "method_index_expression",
    "named": true,
    "fields": {
      "method": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "table": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "function_call",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      }
    }
  },
  "parameters": {
    "type": "parameters",
    "named": true,
    "fields": {
      "name": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "identifier",
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
          "type": "vararg_expression",
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
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "expression",
          "named": true
        }
      ]
    }
  },
  "repeat_statement": {
    "type": "repeat_statement",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "block",
            "named": true
          }
        ]
      },
      "condition": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      }
    }
  },
  "return_statement": {
    "type": "return_statement",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "expression_list",
          "named": true
        }
      ]
    }
  },
  "string": {
    "type": "string",
    "named": true,
    "fields": {
      "content": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "string_content",
            "named": true
          }
        ]
      },
      "end": {
        "multiple": false,
        "required": true,
        "types": []
      },
      "start": {
        "multiple": false,
        "required": true,
        "types": []
      }
    }
  },
  "string_content": {
    "type": "string_content",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "escape_sequence",
          "named": true
        }
      ]
    }
  },
  "table_constructor": {
    "type": "table_constructor",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "field",
          "named": true
        }
      ]
    }
  },
  "unary_expression": {
    "type": "unary_expression",
    "named": true,
    "fields": {
      "operand": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      }
    }
  },
  "variable_declaration": {
    "type": "variable_declaration",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "assignment_statement",
          "named": true
        },
        {
          "type": "variable_list",
          "named": true
        }
      ]
    }
  },
  "variable_list": {
    "type": "variable_list",
    "named": true,
    "fields": {
      "attribute": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "attribute",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "variable",
            "named": true
          }
        ]
      }
    }
  },
  "while_statement": {
    "type": "while_statement",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "block",
            "named": true
          }
        ]
      },
      "condition": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      }
    }
  },
  "break_statement": {
    "type": "break_statement",
    "named": true
  },
  "comment_content": {
    "type": "comment_content",
    "named": true
  },
  "escape_sequence": {
    "type": "escape_sequence",
    "named": true
  },
  "false": {
    "type": "false",
    "named": true
  },
  "hash_bang_line": {
    "type": "hash_bang_line",
    "named": true
  },
  "identifier": {
    "type": "identifier",
    "named": true
  },
  "nil": {
    "type": "nil",
    "named": true
  },
  "number": {
    "type": "number",
    "named": true
  },
  "true": {
    "type": "true",
    "named": true
  },
  "vararg_expression": {
    "type": "vararg_expression",
    "named": true
  }
};
export default LuaTypes;