import { database } from './../data/data.store';
import { IResolvers } from 'graphql-tools'
import _ from 'lodash'
import { cursorTo } from 'readline';

const mutation : IResolvers = {
    Mutation: {
        cursoNuevo(__:void, { curso }): any {
            const itemCurso = {
                id: String(database.cursos.length + 1),
                title: curso.title,
                description: curso.description,
                clases: curso.clases,
                time: curso.time,
                level: curso.level,
                logo: curso.logo,
                path: curso.path,
                teacher: curso.teacher,
                reviews: []
            }
            if (database.cursos.filter(itemCurs => itemCurs.title === itemCurso.title).length === 0) {
                database.cursos.push(itemCurso)
                return itemCurso
            } else {
                return {
                    id: '-1',
                    title: 'Este curso ya existe',
                    description: '-1',
                    clases: -1,
                    time: 0.0,
                    level: 'TODOS',
                    logo: '',
                    path: '',
                    teacher: '',
                    reviews: []
                }
            }
        },
        modificarCurso(__:void, { curso }): any {
            const elementoExiste = _.findIndex(database.cursos, o => o.id === curso.id)

            if (elementoExiste > -1) {
                const valoraciones = database.cursos[elementoExiste].reviews
                curso.reviews = valoraciones
                database.cursos[elementoExiste] = curso
                return curso
            } else {
                return {  
                    id: '-1',
                    title: `El curso ${curso.title} no existe en la base de datos`,
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
        },
        eliminarCurso(__:void, { id }): any {
            const borrarCurso = _.remove(database.cursos, curso => curso.id === id)

            if (!borrarCurso[0]) {
                return {  
                    id: '-1',
                    title: `El curso ${id.id} no existe en la base de datos`,
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
            return borrarCurso[0]
        }
    }
}

export default mutation