import {Logging} from '@google-cloud/logging';

export const logs = (nombre, mensaje, metadata) => {
    if(process.env.NODE_ENV == 'production'){
        let logging = new Logging({
            projectId: process.env.GOOGLE_CLOUD_PROJECT,
        });
        let log = logging.log(nombre);

        let entry = log.entry(metadata, mensaje);
        log.write(entry).then(() => {
            console.log('LOG GUARDADO_l');
        }).catch((error) => {
            console.log('ERROR');
            console.log(error);
        });
    }else{
        let log = {};
        if(metadata.hasOwnProperty('httpRequest')){
            log = {
                logName: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/logs/${nombre}`,
                jsonPayload: mensaje,
                receiveTimestamp: new Date(),
                resource: {
                    labels: {
                        project_id: process.env.GOOGLE_CLOUD_PROJECT
                    },
                    type: metadata.tipo
                },
                httpRequest: metadata.httpRequest
            }
        }else{
            log = {
                logName: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/logs/${nombre}`,
                jsonPayload: mensaje,
                receiveTimestamp: new Date(),
                resource: {
                    labels: {
                        project_id: process.env.GOOGLE_CLOUD_PROJECT
                    },
                    type: metadata.tipo
                }
            }
        }
        console.log(log);
    }
    return;
}

//logs('MODULO-PRUEBA',0,{nuevo: 'dasdsadsa', otro: {a: 'ddddd'}}, 'gae_app');