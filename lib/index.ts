import {Logging} from '@google-cloud/logging';

export const logs = (nombre, severity, mensaje, tipo) => {
    if(process.env.NODE_ENV == 'production'){
        let logging = new Logging({
            projectId: process.env.GOOGLE_CLOUD_PROJECT,
        });
        let log = logging.log(nombre);
        let metadata = {
            resource: {
                type: tipo
            },
            severity: severity
        };

        let entry = log.entry(metadata, mensaje);
        log.write(entry).then(() => {
            console.log('LOG GUARDADO_l');
        }).catch((error) => {
            console.log('ERROR');
            console.log(error);
        });
    }else{
        let log = {
            logName: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/logs/${nombre}`,
            jsonPayload: mensaje,
            receiveTimestamp: new Date(),
            resource: {
                labels: {
                    project_id: process.env.GOOGLE_CLOUD_PROJECT
                },
                type: tipo
            }
        }
        console.log(log);
    }
    return;
}

//logs('MODULO-PRUEBA',0,{nuevo: 'dasdsadsa', otro: {a: 'ddddd'}}, 'gae_app');