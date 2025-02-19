/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';

import defaultPlugins from '../plugins/defaultPlugins';
import serialization from '../serialization';
import flattenDeep from '../flattenDeep';

const serializationFunctions = serialization({
  plugins: flattenDeep(defaultPlugins),
});

describe('serialize to html', () => {
  [
    {
      i: {
        document: {
          nodes: [
            {
              object: 'block',
              type: 'HEADINGS/HEADING-ONE',
              nodes: [{ object: 'text', text: 'Projects' }],
            },
          ],
        },
      },
      o: '<h1>Projects</h1>',
    },
    {
      i: {
        document: {
          nodes: [
            {
              object: 'block',
              type: 'PARAGRAPH/PARAGRAPH',
              nodes: [{ object: 'text', text: 'some projects' }],
            },
          ],
        },
      },
      o: '<p>some projects</p>',
    },
    {
      i: {
        document: {
          nodes: [
            {
              object: 'block',
              nodes: [
                {
                  object: 'text',
                  text: 'some ',
                },
                {
                  object: 'text',
                  marks: [{ data: {}, type: 'EMPHASIZE/EM' }],
                  text: 'projects',
                },
                { object: 'text', text: '-' },
                {
                  object: 'text',
                  marks: [{ data: {}, type: 'EMPHASIZE/STRONG' }],
                  text: 'foo',
                },
              ],
              type: 'PARAGRAPH/PARAGRAPH',
            },
          ],
        },
      },
      o: '<p>some <em>projects</em>-<strong>foo</strong></p>',
    },
    {
      i: {
        document: {
          nodes: [
            {
              object: 'block',
              type: 'CODE/CODE',
              nodes: [
                {
                  object: 'text',
                  text: 'asdf',
                },
              ],
            },
          ],
        },
      },
      o: '<code style="display:block;overflow:scroll">asdf</code>',
      // TODO this should not be skipped but it's a workaround for deserialization...
      skip: true,
    },
    {
      i: {
        document: {
          nodes: [
            {
              object: 'block',
              type: 'PARAGRAPH/PARAGRAPH',
              nodes: [
                {
                  object: 'text',
                  text: 'a',
                },
                {
                  text: 'bc',
                  object: 'text',
                  marks: [
                    {
                      type: 'CODE/CODE',
                    },
                  ],
                },
                {
                  object: 'text',
                  text: 'de',
                },
              ],
            },
          ],
        },
      },
      o: '<p>a<code style="white-space:pre-wrap">bc</code>de</p>',
      skip: true,
    },
    {
      i: {
        document: {
          nodes: [
            {
              object: 'block',
              nodes: [
                { object: 'text', text: 'a' },
                {
                  data: { href: 'foo' },
                  object: 'inline',
                  nodes: [{ object: 'text', text: 'asdf' }],
                  type: 'LINK/LINK',
                },
                { object: 'text', text: 'b' },
              ],
              type: 'HEADINGS/HEADING-FOUR',
            },
          ],
        },
      },
      o: '<h4>a<a href="foo">asdf</a>b</h4>',
      // skip: true
    },
    {
      i: {
        document: {
          nodes: [
            {
              object: 'block',
              type: 'HEADINGS/HEADING-THREE',
              nodes: [
                {
                  object: 'text',
                  text: 'asdfgh',
                },
              ],
              data: {
                align: 'center',
              },
            },
          ],
        },
      },
      o: '<h3 style="text-align:center">asdfgh</h3>',
      skip: true,
    },
    {
      i: {
        document: {
          nodes: [
            {
              object: 'block',
              type: 'BLOCKQUOTE/BLOCKQUOTE',
              nodes: [
                {
                  object: 'text',
                  text: 'asdfgh',
                },
              ],
              data: {
                align: 'center',
              },
            },
          ],
        },
      },
      o: '<blockquote style="text-align:center">asdfgh</blockquote>',
      skip: true,
    },
    {
      i: {
        document: {
          nodes: [
            {
              object: 'block',
              type: 'PARAGRAPH/PARAGRAPH',
              nodes: [{ object: 'text', text: 'ab' }],
              data: { align: 'center' },
            },
          ],
        },
      },
      o: '<p style="text-align:center">ab</p>',
      skip: true,
    },
    {
      i: {
        document: {
          nodes: [
            {
              object: 'block',
              type: 'BLOCKQUOTE/BLOCKQUOTE',
              nodes: [{ object: 'text', text: 'ab\nde' }],
            },
          ],
        },
      },
      o: '<blockquote>ab<br/>de</blockquote>',
      // skip: true
    },
  ].forEach((c, k) => {
    describe(`test case ${k}`, () => {
      it('should serialize properly', () => {
        expect(
          // tslint:disable-next-line:no-any
          serializationFunctions.slateToHtml(Value.fromJSON(c.i as any))
        ).toEqual(c.o);
      });
      it(`should deserialize properly: ${c.o}`, () => {
        if (c.skip) {
          return;
        }
        expect(
          Plain.serialize(serializationFunctions.htmlToSlate(c.o))
        ).toEqual(
          // tslint:disable-next-line:no-any
          Plain.serialize(Value.fromJSON(c.i as any))
        );
      });
    });
  });
});
