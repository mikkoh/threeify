//
// basic shader
//
// Authors:
// * @bhouston
//

import { Context } from "./Context.js";
import { Program } from "./Program.js";
import { BufferGeometry } from "./BufferGeometry.js";

export class VertexArrayObject {

    program: Program;
    glVertexArrayObject: WebGLVertexArrayObject;

    constructor(program: Program, bufferGeometry: BufferGeometry) {

        this.program = program;

        let gl = this.program.context.gl;

        {
            // Create a vertex array object (attribute state)
            var vao = gl.createVertexArray();
            if( ! vao ) {
                throw new Error( "can not create vertex array object" );
            }
            this.glVertexArrayObject = vao;
        }

        // and make it the one we're currently working with
        gl.bindVertexArray(this.glVertexArrayObject);

        let namedVertexAttributes = [ // TODO: There is probably a more efficient way to do this via TS introspection
            { name: 'indices', vertexAttribute: bufferGeometry.indices },
            { name: 'position', vertexAttribute: bufferGeometry.positions },
            { name: 'normals', vertexAttribute: bufferGeometry.normals },
            { name: 'uvs', vertexAttribute: bufferGeometry.uvs }
        ];

        namedVertexAttributes.forEach( namedVertexAttribute => {
            let programAttribute = this.program.attributes.find( attribute => ( attribute.name === namedVertexAttribute.name ) );
            if( ! programAttribute ) { // only bind the attributes that exist in the program.
                return;
            }

            gl.enableVertexAttribArray(programAttribute.glLocation);

            // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
            let buffer = namedVertexAttribute.vertexAttribute.buffer;
            gl.bindBuffer( buffer.target, buffer.glBuffer );

            // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
            let vertexAttribute = namedVertexAttribute.vertexAttribute;
            gl.vertexAttribPointer( programAttribute.glLocation, vertexAttribute.componentsPerVertex, vertexAttribute.componentType, vertexAttribute.normalized, vertexAttribute.vertexStride, vertexAttribute.byteOffset );

        });

    }
}