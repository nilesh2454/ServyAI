import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Service } from '../Interface/service';

@Injectable({
  providedIn: 'root',
})
export class ServiceProvided {
       constructor(private http: HttpClient) {}

  searchServices(query: string, city: string) {
    const url = `https://nominatim.openstreetmap.org/search?q=${query} in ${city}&format=json`;

    return this.http.get<any[]>(url).pipe(
      map(results =>
        results.map((item: any) => ({
          name: item.display_name.split(',')[0],
          category: query,
          location: item.display_name,
          phone: '9876543210',       // mock (API doesn’t always provide)
          whatsapp: '919876543210'   // mock
        }) as Service)
      )
    );
  }
}
