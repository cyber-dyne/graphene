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
                return Object.keys(obj).map(function map(i) {
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

//// ES2016 Object.includes() polyfill. ////////////////////////////////////////
;(function (undefined) {
        'use strict'

        if (Array.prototype.includes) {
                return
        }

        Array.prototype.includes = function (searchElement /*, fromIndex*/) {
                if (this === null) {
                        throw new TypeError('Array.prototype.includes called on null or undefined')
                }

                const obj = Object(this)
                const objLength = parseInt(obj.length, 10) || 0

                if (objLength === 0) {
                        return false
                }

                const argsLenght = parseInt(arguments[1], 10) || 0

                let k
                if (argsLenght >= 0) {
                        k = argsLenght
                } else {
                        k = objLength + argsLenght
                        if (k < 0) {
                                k = 0
                        }
                }

                let currentElement
                while (k < objLength) {
                        currentElement = obj[k]

                        if (searchElement === currentElement ||
                           (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
                                return true
                        }

                        ++k
                }

                return false
        }
})()

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
//         // TODO
// })()
