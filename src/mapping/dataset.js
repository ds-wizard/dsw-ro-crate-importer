import {RDF, SCHEMA} from "../rdf/namespace";
import {addValue} from "../rdf/util";

const CHAPTER_UUID = 'd5b27482-b598-4b8c-b534-417d4ad27394'
const DATASETS_UUID = '4e0c1edf-660c-4ebf-81f5-9fa959dead30'

const DATASET_NAME = 'b0949d09-d179-4491-9fb4-14b0deb9f862'
const DATASET_DESCRIPTION = '3a2ffc13-6a0e-4976-bb34-14ab6d938348'
const DATASET_IDENTIFIERS = 'cf727a0a-78c4-45a7-aa9b-cf7650ae873a'
const DATASET_IDENTIFIER = '9e13b2d3-5f00-4e19-8a52-5c33c5b1cb07'

// TODO: personal/sensitive (from keywords?)
// TODO: distributions (PID or something else?)

export function processDataset(importer, store) {
    console.log("Creating dataset...")

    const prefix = [CHAPTER_UUID, DATASETS_UUID]
    const datasetStatements = store.match(null, RDF('type'), SCHEMA('Dataset'), null);
    datasetStatements.forEach(datasetStatement => {
        const itemUuid = importer.addItem(prefix)
        const datasetPrefix = [...prefix, itemUuid]
        const datasetIdentifier = datasetStatement.subject

        console.log(`Creating dataset (${datasetIdentifier})...`)
        addValue(importer, store, datasetIdentifier, SCHEMA('name'), [...datasetPrefix, DATASET_NAME])
        addValue(importer, store, datasetIdentifier, SCHEMA('description'), [...datasetPrefix, DATASET_DESCRIPTION])
        const identifierStatements = store.match(datasetIdentifier, SCHEMA('identifier'), null, null)
        identifierStatements.forEach(identifierStatement => {
            const identifierItemUuid = importer.addItem([...datasetPrefix, DATASET_IDENTIFIERS])
            const identifierPrefix = [...datasetPrefix, DATASET_IDENTIFIERS, identifierItemUuid]
            importer.setReply([...identifierPrefix, DATASET_IDENTIFIER], identifierStatement.object.value)
        })
        console.log(`Dataset (${datasetIdentifier}) created`)
    })

    console.log("Dataset created")
}
