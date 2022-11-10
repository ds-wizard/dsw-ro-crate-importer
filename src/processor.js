import * as $rdf from 'rdflib'
import {processPerson} from './mapping/person'
import {processProject} from './mapping/project'

const BASE_URL = "http://example.org"

export class RoCrateProcessor {

    constructor(importer) {
        this.importer = importer
        this.error = null
    }

    run(data) {
        return new Promise((resolve, reject) => {
            const store = $rdf.graph();
            console.log("Loading data into RDF store....")
            $rdf.parse(JSON.stringify(data), store, BASE_URL, "application/ld+json", () => {
                console.log("Data loaded into RDF store!")
                resolve(store)
            })
        })
            .then(store => {
                console.log("Going to process the RDF....")
                processPerson(this.importer, store)
                processProject(this.importer, store)
                console.log("RDF processed!")
                logResult(this.importer)
            })
    }

}

function logResult(importer) {
    console.log("--------------------------------")
    console.log("Summary")
    console.log("--------------------------------")
    importer._events.forEach(event => {
        console.log(event)
    })
}
