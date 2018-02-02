// Copyright (c) 2018, Cyber Dyne SRL. All rights reserved.
// This code may only be used under the BSD style license found at https://github.com/cyber-dyne/graphene/License.txt
// The complete set of authors may be found at https://github.com/cyber-dyne/graphene/Authors.txt
// The complete set of contributors may be found at https://github.com/cyber-dyne/graphene/Contributors.txt

//// ES6 Object.assign() polyfill. /////////////////////////////////////////////
;(function (undefined) {
        'use strict'

        if (Object.assign) {
                return
        }

        // Let's polyfill the platform.

        function assign(target) {
                'use strict'

                if (target === undefined || target === null) {
                        throw new TypeError('Cannot convert first argument to object')
                }

                const to = Object(target)

                for (let i=1; i<arguments.length; ++i) {
                        let nextSource = arguments[i]

                        if (nextSource === undefined || nextSource === null) {
                                continue
                        }
                        nextSource = Object(nextSource)

                        const keysArray = Object.keys(Object(nextSource))

                        for (let nextIndex=0, len=keysArray.length; nextIndex<len; ++nextIndex) {
                                const nextKey = keysArray[nextIndex]
                                const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey)

                                if (desc !== undefined && desc.enumerable) {
                                        to[nextKey] = nextSource[nextKey]
                                }
                        }
                }

                return to
        }

        Object.defineProperty(Object, 'assign', {
                enumerable:   false,
                configurable: true,
                writable:     true,
                value:        assign
        })
})()

//// ES2017 Object.values() polyfill. //////////////////////////////////////////
;(function (undefined) {
        'use strict'

        if (Object.values) {
                return
        }

        function values(obj) {
                return Object.keys(obj)
                             .map(function (i) {
                                     return obj[i]
                             })
        }

        Object.defineProperty(Object, 'values', {
                enumerable:   false,
                configurable: true,
                writable:     true,
                value:        values
        })
})()

//// WebComponents polyfill. ///////////////////////////////////////////////////
// ;(function (undefined) {
//         'use strict'
//
//         const hasRegister = 'registerElement' in document
//         const hasImport   = 'import'  in document.createElement('link')
//         const hasContent  = 'content' in document.createElement('template')
//
//         if (! hasRegister || ! hasImport || ! hasContent) {
//                 // Let's polyfill the platform.
//                 const prefix = `${Graphene.PREFIX}`
//
//                 const el = document.createElement('script')
//                 el.src = prefix + '/webcomponentsjs/webcomponents-lite.js'
//
//                 document.head.appendChild(el)
//         }
// })()

//// ES6 Promise polyfill. /////////////////////////////////////////////////////
// ;(function (undefined) {
//         'use strict'
//
//         if (Promise) {
//                 let promiseToString = null
//
//                 try {
//                         promiseToString = Object.prototype.toString.call(Promise.resolve())
//                 } catch (ex) {}
//
//                 if (promiseToString === '[object Promise]' && ! Promise.cast) {
//                         return
//                 }
//         }
//
//         // Let's polyfill the platform.
//         const prefix = `${Graphene.PREFIX}`
//
//         const el = document.createElement('script')
//         el.src = prefix + '/es6-promise/es6-promise.auto.js'
//
//         document.head.appendChild(el)
// })()
