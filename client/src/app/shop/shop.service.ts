import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Composer } from '../shared/models/composer';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { Type } from '../shared/models/type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];
  composers: Composer[] = [];
  types: Type[] = [];
  pagination?: Pagination<Product[]>;
  shopParams = new ShopParams();
  productCache = new Map<string, Pagination<Product[]>>();

  constructor(private http: HttpClient) {}

  getProducts(useCache = true): Observable<Pagination<Product[]>> {
    if (!useCache) this.productCache = new Map();

    if (this.productCache.size > 0 && useCache) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        this.pagination = this.productCache.get(
          Object.values(this.shopParams).join('-')
        );
        if (this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.shopParams.composerId > 0)
      params = params.append('composerId', this.shopParams.composerId);
    if (this.shopParams.typeId)
      params = params.append('typeId', this.shopParams.typeId);
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber);
    params = params.append('pageSize', this.shopParams.pageSize);
    if (this.shopParams.search)
      params = params.append('search', this.shopParams.search);

    return this.http
      .get<Pagination<Product[]>>(this.baseUrl + 'products', {
        params,
      })
      .pipe(
        map((response) => {
          this.productCache.set(
            Object.values(this.shopParams).join('-'),
            response
          );
          this.pagination = response;
          return response;
        })
      );
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number) {
    const product = [...this.productCache.values()].reduce(
      (acc, paginatedResult) => {
        return { ...acc, ...paginatedResult.data.find((x) => x.id === id) };
      },
      {} as Product
    );

    if (Object.keys(product).length !== 0) return of(product);

    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getComposers(): Observable<Composer[]> {
    if (this.composers.length > 0) {
      // If composers array is already populated, return it in alphabetical order.
      return of(this.sortComposers());
    }

    return this.http.get<Composer[]>(this.baseUrl + 'products/composers').pipe(
      map((composers) => {
        this.composers = composers;
        return this.sortComposers();
      })
    );
  }

  private sortComposers(): Composer[] {
    return this.composers.slice().sort((a, b) => {
      const lastNameA = a.lastName.toLowerCase();
      const lastNameB = b.lastName.toLowerCase();

      if (lastNameA < lastNameB) return -1;
      if (lastNameA > lastNameB) return 1;
      return 0;
    });
  }

  getTypes(): Observable<Type[]> {
    if (this.types.length > 0) {
      // If types array is already populated, return it in alphabetical order.
      return of(this.sortTypes());
    }

    return this.http.get<Type[]>(this.baseUrl + 'products/types').pipe(
      map((types) => {
        this.types = types;
        return this.sortTypes();
      })
    );
  }

  private sortTypes(): Type[] {
    return this.types.slice().sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }
}
