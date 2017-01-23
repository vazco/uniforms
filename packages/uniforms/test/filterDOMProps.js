import {describe} from 'mocha';
import {expect}   from 'chai';
import {it}       from 'mocha';

import filterDOMProps from 'uniforms/filterDOMProps';

describe('joinName', () => {
    it('is a function', () => {
        expect(filterDOMProps).to.be.a('function');
    });

    it('removes props', () => {
        expect(filterDOMProps({value: 999999})).to.deep.equal({});
        expect(filterDOMProps({changed: true})).to.deep.equal({});
    });

    it('removes registered props', () => {
        filterDOMProps.register('__special__');

        expect(filterDOMProps({__special__: true})).to.deep.equal({});
    });

    it('omits rest', () => {
        expect(filterDOMProps({a: 1})).to.deep.equal({a: 1});
        expect(filterDOMProps({b: 2})).to.deep.equal({b: 2});
    });
});
