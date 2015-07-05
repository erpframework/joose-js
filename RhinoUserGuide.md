Joose passes all of it's test suite under Rhino without modification.

Due to namespace issues when using multiple files, you might, however, want to set the variable ` joose.top ` to you desired top level namespace before declaring any objects (Classes, Roles, etc.) with Joose.

The most intuitive way might be to call
` joose.top = this `
at the top of your file.