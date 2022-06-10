import { Controller, Get, Post, Put, Param } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiHeader,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiHeader({
  name: 'Assign',
  description: 'Handles all the assigning of new boats',
})
@ApiTags('Assign')


@Controller('assign')
export class AssignController {

    @ApiCreatedResponse({
        description: 'New boat assigned successfully',
      })
    
    @Post()
    create() {
        return {
            serialNumber:"124124",
            boatId:"122",
            location:"Seletar"
        }
    }

    @ApiOkResponse({
        description: 'Assigned boats retrieved successfully',
      })

    @Get()
    findAll() {
        return {
            serialNumber:"124124",
            boatId:"122",
            location:"Seletar",
            dateAssigned:"01-05-2022",
            assignee:"Bob"
        }
    }

    @ApiOkResponse({
        description: 'Assigned boat edited successfully',
      })

    @Put(':id')
    update(@Param('id') id: string) {
        return {
            serialNumber:"124124",
            boatId:"122",
            location:"Seletar"
        }
    }
    
}