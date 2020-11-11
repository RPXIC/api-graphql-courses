import { database } from './../data/data.store';
import { IResolvers } from 'graphql-tools'

const query : IResolvers = {
    Query: {
        estudiantes(): any {
            return database.estudiantes
        },
        estudiante(__: void, { id }): any {
            const resultado = database.estudiantes.filter(estudiante => estudiante.id === id)[0]
            if (!resultado) {
                return {
                    id: '-1',
                    name: `No se ha encontrado el estudiante con id ${id}`,
                    email: '',
                    courses: []
                }
            }
            return resultado
        },
        cursos(): any {
            return database.cursos
        },
        curso(__: void, { curso }): any {
            const resultado = database.cursos.filter(_curso => _curso.id === curso)[0]
            if (!resultado) {
                return {
                    id: '-1',
                    title: `No se ha encontrado el curso con id ${curso}`,
                    description: '',
                    clases: -1,
                    time: 0.0,
                    logo: '',
                    level: 'TODOS',
                    path: '',
                    teacher: '',
                    reviews: []
                }
            }
            return resultado
        },
    }
}

export default query