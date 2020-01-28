import { IDocument } from "./interfaces/docIntefaces";

export const template: IDocument = {
    title: 'Example',
    author: 'Andrea',
    pages: [
        {
            views: [
                {
                    style: { backgroundColor: 'red', display: 'flex', flexDirection: 'row' }, children: [
                        { type: 'text', content: 'Hello {{firstName}} you are {{age}} years old', style: { flexGrow: 1 } },
                        { type: 'text', content: 'My World', style: { flexGrow: 3 } },
                    ]
                },
                {
                    style: { backgroundColor: 'blue', float: 'right' }, children: [
                        { type: 'text', content: 'your name is:  {{lastName}}' },
                        { type: 'text', content: 'your lastname is: {{firstName}}' },
                        { type: 'text', content: 'generate from: {{date}}' },
                        { type: 'text', content: 'Url Image is: {{{url}}}' },

                    ],



                },
                {
                    style: { backgroundColor: "white", wrap: true, margin: "auto", heigth: "auto", width: "auto" }, children: [
                        { type: 'image', source: "{{{url}}}", debug: true },
                        { type: 'image', source: "https://react-pdf.org/static/images/logo.png", debug: true },
                    ]
                }
            ]
        }
    ]
}