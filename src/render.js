import './render.css'
import loadable from '@loadable/component';

const LocaleDataLoaderLite = loadable.lib(
    (props) => import(`./locale/${props.locale}/lite.js`),
);

export function render() {
    const el = document.createElement('div')
    el.classList.add('text')
    document.getElementsByTagName('body')[0].appendChild(el)
    el.innerHTML = 'hello, world'
}