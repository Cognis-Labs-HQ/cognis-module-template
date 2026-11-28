# Usage

An installable example for creating a Cognis extension with its own data and interface.

## Prerequisites

An administrator must install and enable the module. Sign in before opening the showcase.

## Examples

Open /showcase, enter an item label and submit the form. Reopen the list to inspect the saved item.

- Open `/showcase` after enabling the module to use its localized page-composer UI.
- Run `cognisctl modules:module-template:list` to consume the same authenticated API through the CLI.
- Resolve `module-template:listItems` through `ctx` instead of importing module internals.
- Extend the `module-template:listItems` flow through a named, removable stage.
- Disable and re-enable the module to verify that scoped registrations are repeatable.

## Expected Results

The item appears in the module’s list; the authenticated command and browser view read the same stored items.

## Troubleshooting

If the showcase is unavailable, ask an administrator to check module enablement and the required database and authentication services.
