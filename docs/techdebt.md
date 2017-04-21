## Bookit technical debt

### "Small" tasks
- Use consistent action format: VERB_NOUN_xx
- Add Enzyme tests to all components
- Separate reducers into separate files
- Fix React Router usage
- Document `.env`, mode switching, event generation
- Best practice for Mocha "Setup" & "Cleanup"
- Use Express routing

### "Medium" tasks
- Style cleanup: do nested styles right, brand colors defined in two places (MUI theme & "variables")

### Misc/un-sized tasks
- Client date range should match cache date range
- Lib vs utils? We have both
- Use a proper UUID library
- Replace "secure" with Travis variables

### Potential bug
- Rooms list doesn't match: client vs cache
