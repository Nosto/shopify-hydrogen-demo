const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const capitalizeQueries = (node) => {
  if (node.kind === "FragmentDefinition") {
    return "not used";
  }
  return capitalize(node.name.value) + capitalize(node.operation);
};
function processSources(sources, buildName = capitalizeQueries) {
  const sourcesWithOperations = [];
  for (const originalSource of sources) {
    const source = fixLinebreaks(originalSource);
    const { document } = source;
    const operations = [];
    for (const definition of document?.definitions ?? []) {
      if (definition?.kind !== "OperationDefinition" && definition?.kind !== "FragmentDefinition")
        continue;
      if (definition.name?.kind !== `Name`)
        continue;
      operations.push({
        initialName: buildName(definition),
        definition
      });
    }
    if (operations.length === 0)
      continue;
    sourcesWithOperations.push({
      source,
      operations
    });
  }
  return sourcesWithOperations;
}
function fixLinebreaks(source) {
  const fixedSource = { ...source };
  fixedSource.rawSDL = source.rawSDL?.replace(/\r\n/g, "\n");
  return fixedSource;
}

export { processSources };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=sources.js.map