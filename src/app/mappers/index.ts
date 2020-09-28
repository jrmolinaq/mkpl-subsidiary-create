import { FormGroup } from '@angular/forms';
import { CityInterface, RegionInterface } from '../interfaces/locations.interface';

/*export function toCreateSubsidiary(form: FormGroup, regions: RegionInterface[], cities: CityInterface[]) {
  const generalGet = getFromForm(form, 'general');
  const contactGet = getFromForm(form, 'contact');
  return {
    status: true,
    alias: generalGet('company'),
    location: { address: generalGet('address') },
    name: contactGet('contactName'),
    phone: contactGet('contactPhone'),
    email: contactGet('contactEmail'),
    admin_user: { email: contactGet('adminEmail') },
    time_regions_delivery: regions.map(region => ({
      days: region.days,
      region: { id: region.id }
    })),
    time_cities_delivery: cities.map(city => ({
      days: city.days,
      city: { id: city.id }
    }))
  };
}*/

export function toCreateSubsidiary(form: FormGroup) {
  const generalGet = getFromForm(form, 'general');
  const contactGet = getFromForm(form, 'contact');
  return {
    status: true,
    alias: generalGet('company'),
    location: { address: generalGet('address') },
    name: contactGet('contactName'),
    phone: contactGet('contactPhone'),
    email: contactGet('contactEmail'),
    admin_user: { email: contactGet('adminEmail') }
  };
}

function getFromForm(form: FormGroup, formName: string) {
  return (attribute: any) => form.get(`${formName}.${attribute}`).value;
}
