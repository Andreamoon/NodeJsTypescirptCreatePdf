export interface IDocument {
    title: string;
    author: string;
    pages: [IPage]
}

export enum PageOrientation {
    PORTRAIT = 'portrait',
    LANDSCAPE = 'landscape'
}

export interface IPage {
    size?: string;
    orientation?: PageOrientation;
    views: IView[];
}

export interface IView {
    wrap?: boolean;
    style?: {} | [];
    children?: (IView | IText | IImage)[];
}

export interface IText extends IView {
    content: string;
    type: 'text';
}
type HTTPMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type IImageSource =
    | string
    | { data: Buffer; format: 'png' | 'jpg' }
    | { uri: string; method: HTTPMethod; body: any; headers: any };

export interface IImage extends IView {
    source: IImageSource;
    type: 'image';
    debug?: boolean;
    
}