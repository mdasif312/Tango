import * as mongoose from 'mongoose';
import BaseInterface from "./base.interface";
import {IsString} from 'class-validator';

class BaseModel {
    @IsString()
    collectionName: string;
    schema: any;

    constructor(collectionName: string, schema: any) {
        this.collectionName = collectionName;
        this.schema = new mongoose.Schema(schema, {versionKey: false});
    }

    getModelSchema() {
        return mongoose.model<BaseInterface & mongoose.Document>(this.collectionName, this.schema);
    }
}

export default BaseModel;
