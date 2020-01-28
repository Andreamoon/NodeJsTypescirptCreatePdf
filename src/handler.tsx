import * as  React from 'react'
import ReactPDF from '@react-pdf/renderer';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import fs from 'fs';
import { IDocument, IView, IText, IImage } from './interfaces/docIntefaces';
const mustache = require('mustache')

function MyView(props: { view: IView | IText | IImage; input?: {} }) {

    if ('type' in props.view) {
        switch (props.view.type) {
            case 'text':
                const { content, ...other } = props.view;
                console.log(content)
                return <Text {...other}>{mustache.render(content, props.input)}</Text>;
                
            case 'image':
                const {source,...otherImageProps} = props.view
                const renderedSource = typeof source === 'string' ? mustache.render(source, props.input) : source;
                return <Image source={renderedSource}  {...otherImageProps}  ></Image>;
        }
    }
    const { children, ...other } = props.view;
    return <View {...other}>{(children || []).map(view => <MyView input={props.input} view={view} />)}</View>
}

function MyDocument(props: { document: IDocument, input?: {} }) {
    const { pages, ...other } = props.document;
    return (
        <Document {...other}>
            {pages.map(({ views, ...other }) => (
                <Page {...other}>
                    {views.map(view => <MyView input={props.input} view={view} />)}
                </Page>
            ))}
        </Document>
    )
}

async function convertToBuffer(stream: any): Promise<Buffer> {
    return new Promise((resolve) => {
        let buf: any = [];
        stream.on('data', (d: any) => buf.push(d));
        stream.on('end', () => resolve(Buffer.concat(buf)));
    });
}


export async function renderTemplate(template: IDocument, input?: {}): Promise<Buffer> {
    const res = await ReactPDF.renderToStream(<MyDocument document={template} input={input} />)
    return await convertToBuffer(res);

}