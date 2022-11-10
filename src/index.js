window.opener = {
    postMessage: () => {
        window.postMessage({type: 'ready'}, '*')
    }
}

import DSWImporter from '@ds-wizard/importer-sdk'
import {RoCrateProcessor} from './processor'
import exampleData from './example/data'
import {showError} from './ui'

window.addEventListener('load', (event) => {
    console.log("Initialing the importer...")
    const importer = new DSWImporter()
    importer
        .init()
        .then(() => {
            console.log("Importer initialized!")
            const roCrateProcessor = new RoCrateProcessor(importer)
            roCrateProcessor.run(exampleData) // TODO remove the line
            const fileSelector = document.getElementById('file-input')
            fileSelector.addEventListener('change', (event) => {
                const fileList = event.target.files
                console.log(fileList)
                if (fileList.length !== 1) {
                    alert('File not selected...')
                    return
                }
                const file = fileList[0]

                const reader = new FileReader()
                reader.addEventListener('load', (event) => {
                    let data = null
                    try {
                        data = JSON.parse(event.target.result)
                    } catch (error) {
                        showError('Failed to parse JSON file.')
                        return
                    }
                    try {
                        return roCrateProcessor.run(data)
                            .then(() => {
                                try {
                                    logResult(importer)
                                    importer.send()
                                } catch (error) {
                                    showError('Failed to send data back to the Wizard.')
                                }
                            })
                    } catch (error) {
                        console.log(error)
                        if (roCrateProcessor.error !== null) {
                            showError(roCrateProcessor.error)
                        } else {
                            showError('Failed to import replies from JSON.')
                        }
                    }

                })
                reader.readAsText(file)
            })
        })
        .catch(error => {
            console.error(error)
            throw error
        })

})
