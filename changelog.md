
### v0.0.0-dev.9

breaking
- tokenDecode now returns {header, data: {payload}} so we can inspect the header
- signatureVerify now always throws if the signature isn't valid
- these renames will break your imports
  - rename "source" directory to "s"
  - rename "dist" directory to "x"

### v0.0.0-dev.8
