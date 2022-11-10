export function addValue(importer, store, subject, predicate, path, condition = field => true, map = field => field) {
    var statements = store.match(subject, predicate, null, null)
    if (statements.length > 0) {
        var objectValue = statements[0].object.value
        if (condition(objectValue)) {
            importer.setReply(path, map(objectValue))
        }
    }
}
