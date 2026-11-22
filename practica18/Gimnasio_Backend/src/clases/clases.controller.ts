import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Publico } from '../auth/decoradores/publico.decorator';
import { Roles } from '../auth/decoradores/roles.decorator';
import { Rol } from '../auth/dominio/usuario';
import { ClasesService } from './clases.service';
import { CrearClaseDto } from './dto/crear-clase.dto';
import { ActualizarClaseDto } from './dto/actualizar-clase.dto';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Publico()
  @Get()
  listar(@Query('q') q?: string) {
    return this.clasesService.listar(q);
  }

  @Publico()
  @Get(':id')
  async buscar(@Param('id', ParseIntPipe) id: number) {
    const clase = await this.clasesService.buscarConHorarios(id);
    if (!clase) {
      throw new NotFoundException(`No existe la clase ${id}`);
    }
    return clase;
  }

  @Roles(Rol.admin)
  @Post()
  @HttpCode(201)
  crear(@Body() dto: CrearClaseDto) {
    return this.clasesService.crear(dto);
  }

  @Roles(Rol.admin)
  @Patch(':id')
  async actualizar(@Param('id') id: string, @Body() dto: ActualizarClaseDto) {
    const clase = await this.clasesService.actualizar(Number(id), dto);
    if (!clase) {
      throw new NotFoundException(`No existe la clase ${id}`);
    }
    return clase;
  }

  @Roles(Rol.admin)
  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    const clase = await this.clasesService.eliminar(Number(id));
    if (!clase) {
      throw new NotFoundException(`No existe la clase ${id}`);
    }
    return clase;
  }
}
