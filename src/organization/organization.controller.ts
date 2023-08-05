import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-org.dto';
import { Organization } from './organization.entity';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }
  @Get()
  findAll(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Organization> {
    const orgId = parseInt(id);
    return this.organizationService.findOne(orgId);
  }
}
