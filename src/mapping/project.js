import {RDF, SCHEMA} from "../rdf/namespace";
import {addValue} from "../rdf/util";

const CHAPTER_UUID = '1e85da40-bbfc-4180-903e-6c569ed2da38'
const PROJECTS_UUID = 'c3dabaaf-c946-4a0d-889c-ede966f97667'

const PROJECT_NAME = 'f0ef08fd-d733-465c-bc66-5de0b826c41b'
const PROJECT_ALTERNATE_NAME = '5b765df9-299f-4855-9e99-aa844903f8f6'
const PROJECT_DESCRIPTION = '22583d74-3c98-4e0a-b363-26d767c88212'
const PROJECT_STARTING_DATE = 'de84b9b5-bcd0-4954-8370-72ea83916b8c'
const PROJECT_END_DATE = 'cabc6f07-6015-454e-b97a-c34db4ec0c60'
const PROJECT_URL = 'a00ae929-d5cf-43c0-8e9e-cdb12ebde717'

const GRANT_IDENTIFIER = '1ccbd0bb-4263-4240-9dc5-936ef09eef53'
const GRANT_FUNDER = '0b12fb8c-ee0f-40c0-9c53-b6826b786a0c'

export function processProject(importer, store) {
    console.log("Creating projects...")

    const prefix = [CHAPTER_UUID, PROJECTS_UUID]
    const projectStatements = store.match(null, RDF('type'), SCHEMA('ResearchProject'), null);
    projectStatements.forEach(projectStatement => {
        const itemUuid = importer.addItem(prefix)
        const contributorPrefix = [...prefix, itemUuid]
        const projectIdentifier = projectStatement.subject

        console.log(`Creating person (${projectIdentifier})...`)
        addValue(importer, store, projectIdentifier, SCHEMA('name'), [...contributorPrefix, PROJECT_NAME])
        addValue(importer, store, projectIdentifier, SCHEMA('alternateName'), [...contributorPrefix, PROJECT_ALTERNATE_NAME])
        addValue(importer, store, projectIdentifier, SCHEMA('description'), [...contributorPrefix, PROJECT_DESCRIPTION])
        addValue(importer, store, projectIdentifier, SCHEMA('foundingDate'), [...contributorPrefix, PROJECT_STARTING_DATE])
        addValue(importer, store, projectIdentifier, SCHEMA('dissolutionDate'), [...contributorPrefix, PROJECT_END_DATE])
        addValue(importer, store, projectIdentifier, SCHEMA('url'), [...contributorPrefix, PROJECT_URL])
        processGrant(importer, store, prefix, itemUuid, projectIdentifier)
        console.log(`Person (${projectIdentifier}) created`)
    })

    console.log("Projects created")
}

function processGrant(importer, store, prefix, itemUuid, projectIdentifier) {
    console.log(`Creating grant for project (${projectIdentifier})`)
    const fundingStatements = store.match(projectIdentifier, SCHEMA('funding'), null, null);
    fundingStatements.forEach(fundingStatement => {
        var grantStatements = store.match(fundingStatement.object, RDF('type'), SCHEMA('Grant'), null)
        grantStatements.forEach(grantStatement => {
            const grantPrefix = [...prefix, itemUuid]
            const grantIdentifier = grantStatement.subject

            console.log(`Creating grant (${grantIdentifier}) for project (${projectIdentifier})...`)
            addValue(importer, store, grantIdentifier, SCHEMA('identifier'), [...grantPrefix, GRANT_IDENTIFIER])
            addValue(importer, store, grantIdentifier, SCHEMA('funder'), [...grantPrefix, GRANT_FUNDER])
            console.log(`Grant (${grantIdentifier}) for project (${projectIdentifier}) created`)
        })
    })
    console.log(`Grant for project (${projectIdentifier}) created`)
}
