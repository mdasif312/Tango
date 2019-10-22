import {IsString} from 'class-validator';

class IDDto {
    @IsString()
    public _id: string;

}

export default IDDto;
