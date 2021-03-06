//
// based on Accessor from glTF
//
// Authors:
// * @bhouston
//

import { AttributeView } from './AttributeView.js';
import { ComponentType, componentTypeSizeOf } from './ComponentType.js';

export class AttributeAccessor {
	attributeView: AttributeView;
	byteOffset: number;
	componentType: ComponentType;
	componentsPerVertex: number;
	count: number;
	byteLength: number;
	//minExtent: ComponentType;
	//maxExtent: ComponentType;

	constructor(
		attributeView: AttributeView,
		byteOffset: number,
		componentType: ComponentType,
		componentsPerVertex: number,
		count: number,
	) {
		this.attributeView = attributeView;
		this.byteOffset = byteOffset;
		this.componentType = componentType;
		this.componentsPerVertex = componentsPerVertex;

		let bytesPerComponent = componentTypeSizeOf(this.componentType);
		this.count =
			count < 0 ? attributeView.byteLength / bytesPerComponent : count;
		this.byteLength = bytesPerComponent * this.componentsPerVertex * this.count;
		//this.minExtent = minExtent;
		//this.maxExtent = maxExtent;
	}
}

// TODO: Figure out how to replace these below with TypeScript templates
// see here for ideas: https://www.typescriptlang.org/docs/handbook/advanced-types.html

export class Int16AttributeAccessor extends AttributeAccessor {
	constructor(intArray: Int16Array, componentsPerVertex: number) {
		super(
			new AttributeView(intArray, 0, -1, 2 * componentsPerVertex),
			0,
			ComponentType.Int,
			componentsPerVertex,
			-1,
		);
	}
}

export class Int32AttributeAccessor extends AttributeAccessor {
	constructor(intArray: Int32Array, componentsPerVertex: number) {
		super(
			new AttributeView(intArray, 0, -1, 4 * componentsPerVertex),
			0,
			ComponentType.Int,
			componentsPerVertex,
			-1,
		);
	}
}

export class Float32AttributeAccessor extends AttributeAccessor {
	constructor(vec2Array: Float32Array, componentsPerVertex: number) {
		super(
			new AttributeView(
				new Float32Array(vec2Array),
				0,
				-1,
				4 * componentsPerVertex,
			),
			0,
			ComponentType.Float,
			componentsPerVertex,
			-1,
		);
	}
}
