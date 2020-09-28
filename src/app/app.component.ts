import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LocationsService } from './services/locations.service';
//import { toCreateSubsidiary } from './mappers';
import { SubsidiaryService } from './services/subsidiary.service';
import { ModalService } from './services/modal.service';

declare const Liferay: any;

@Component({
	templateUrl: 
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/mkpl-subsidiary-create/app/app.component.html'
})
export class AppComponent implements OnInit {
	form: FormGroup;
	currentStep = 1;
	countries: any = [];
	regional: any = [];
	generalCities: any = [];
	//regions: Array<RegionInterface>;
	//cities: CityInterface[];
	showRegions = false;
	showCities = false;
	currentRegion: number;
	requestError = false;
	loading = false;
  
	constructor(
	  private locationService: LocationsService,
	  private subsidiaryService: SubsidiaryService,
	  private modalService: ModalService
	) { }
  
	ngOnInit() {
		this.buildForm();
		this.locationService.getCountries().subscribe(response => {
			this.countries = response;
		});

	  /*combineLatest([
		this.locationService.getCountries().pipe(pluck('data')),
		this.locationService.getRegions(COLOMBIA).pipe(pluck('data'))
	  ])
		.pipe(
		  switchMap(([countries, regions]) => {
			this.countries = countries;
			this.regions = regions.map((region: any) => ({ ...region, days: 0 }));
			return combineLatest(
			  regions.map((region: { id: number; }) =>
				this.locationService.getCities(region.id).pipe(pluck('data'))
			  )
			) as Observable<CityInterface[]>;
		  }),
		  map((cities: CityInterface[]) =>
			cities.reduce((currentCities, actualCities) => currentCities.concat(actualCities), [])
		  ),
		  map((cities: CityInterface[]) =>
			cities.reduce((currentCities, actualCity) => currentCities.concat({ ...actualCity, days: 0 }), [])
		  )
		)
		.subscribe(cities => {
		  this.cities = cities;
		  this.buildForm();
		});*/
	}
  
	buildForm() {
	  this.form = new FormGroup({
		general: new FormGroup({
		  company: new FormControl('', [
			Validators.required,
			Validators.minLength(3),
			Validators.maxLength(49)
		  ]),
		  country: new FormControl('', [Validators.required]),
		  regional: new FormControl('', [Validators.required]),
		  city: new FormControl('', [Validators.required]),
		  address: new FormControl('', [
			Validators.required,
			Validators.maxLength(49)
		  ])
		}),
		contact: new FormGroup({
		  contactName: new FormControl('', [
			Validators.required,
			Validators.minLength(3),
			Validators.maxLength(49)
		  ]),
		  contactPhone: new FormControl('', [
			Validators.required,
			Validators.pattern('[0-9]{7,}')
		  ]),
		  contactEmail: new FormControl('', [
			Validators.required,
			Validators.pattern(
			  '^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$'
			),
			Validators.maxLength(49)
		  ]),
		  adminEmail: new FormControl('', [
			Validators.required,
			Validators.pattern(
			  '^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$'
			),
			Validators.maxLength(49)
		  ])
		})
	  });
	}
  
	changeCountry(value: any) {

	  this.locationService.getRegions(value).subscribe(response => this.regional = response, () => this.regional = []);
	
	  /*this.regional = this.regions.filter(
		region => region.country.id === Number(value)
	  );*/

	  this.form.get('general.regional').setValue('');
	  this.form.get('general.city').setValue('');
	}
  
	changeRegional(value: any) {
		this.locationService.getCities(value).subscribe(response => this.generalCities = response, () => this.generalCities = []);

	  /*this.generalCities = this.cities.filter(
		city => city.region.id === Number(value)
	  );*/

	  this.form.get('general.city').setValue('');
	}
  
	/* formValidity() {
	  return !this.regions.some(region => region.days > 0) || this.loading;
	} */
  
	nextStep() {
	  this.currentStep = this.currentStep + 1;
	}
  
	previousStep() {
	  if (this.currentStep === 1) {
		this.currentStep = 1;
	  }
	  this.currentStep = this.currentStep - 1;
	}
  
	/*setLocations(event: { cities: CityInterface[]; regions: RegionInterface[]; }) {
	  this.cities = event.cities;
	  this.regions = event.regions;
	}*/
  
	createSubsidiary(event: Event) {
	  event.preventDefault();
	  //const subsidiary = toCreateSubsidiary(this.form, this.regions, this.cities);
	  const subsidiary = this.toCreateSubsidiary(this.form);

	  const cityId = this.form.get('general.city').value;
	  // TODO traer desde liferay const providerId = user.providerId.toString();
	  const providerId = '1';
	  this.loading = true;
	  
	  this.subsidiaryService.createSubsidiary( subsidiary, cityId, providerId )
		.subscribe({
		  next: () => {
			this.requestError = false;
			this.modalService.open('modal-subsidiary-create');
			this.loading = false;
		  },
		  error: () => {
			this.requestError = true;
			this.modalService.open('modal-subsidiary-create');
			this.loading = false;
		  }
		});
	}
  
	openModal() {
	  this.modalService.open('modal-subsidiary-create');
	}
  
	closeModal() {
	  this.modalService.close('modal-subsidiary-create');
	  if (!this.requestError) {
		//this.location.back();
		window.location.href = "/subsidiary";
	  }
	}





///// Mapper


	 toCreateSubsidiary(form: FormGroup) {
		const generalGet = this.getFromForm(form, 'general');
		const contactGet = this.getFromForm(form, 'contact');
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
	  
	  getFromForm(form: FormGroup, formName: string) {
		return (attribute: any) => form.get(`${formName}.${attribute}`).value;
	  }




  }
  