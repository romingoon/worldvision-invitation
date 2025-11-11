export interface NaverLatLng {
  lat(): number;
  lng(): number;
}

export interface NaverMap {
  setCenter(location: NaverLatLng): void;
  setZoom(zoom: number): void;
  getBounds(): unknown;
  destroy(): void;
}

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (
          element: HTMLElement,
          options: Record<string, unknown>
        ) => NaverMap;
        LatLng: new (lat: number, lng: number) => NaverLatLng;
        Marker: new (options: Record<string, unknown>) => unknown;
        Position: Record<string, unknown>;
        ZoomControlStyle: {
          SMALL: number;
          LARGE: number;
        };
        Size: new (width: number, height: number) => unknown;
        Point: new (x: number, y: number) => unknown;
        InfoWindow: new (options: Record<string, unknown>) => unknown;
        Event: {
          addListener(
            target: unknown,
            eventName: string,
            listener: () => void
          ): void;
        };
      };
    };
  }
}

export {};
