/*
 * Copyright (c) 2014 Gwennael Buchet
 *
 * License/Terms of Use
 *
 * Permission is hereby granted, free of charge and for the term of intellectual property rights on the Software, to any
 * person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify
 * and propagate free of charge, anywhere in the world, all or part of the Software subject to the following mandatory conditions:
 *
 *   •    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 *  Any failure to comply with the above shall automatically terminate the license and be construed as a breach of these
 *  Terms of Use causing significant harm to Gwennael Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennael Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennael Buchet.
 *
 *  These Terms of Use are subject to French law.
 */

/**
 * A CGSGNodeEllipse represent a basic ellipse.
 * By default, the pickNodeMethod used to detect the node under the mice is CGSGPickNodeMethod.GHOST.
 * If you don't need precision on detection on your ellipses, just change the property to pickNodeMethod.REGION.
 *
 * @class CGSGNodeEllipse
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {CGSGNodeEllipse}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGNodeEllipse = CGSGNode.extend(
    {
        initialize: function (x, y, width, height) {
            this._super(x, y);
            this.resizeTo(width, height);

            this._f = 1.16666666;
            this._mf = 1 - this._f;
            this._w = 0;
            this._mw = 0;

            this._computeWmW();

            /**
             * @property classType
             * @readonly
             * @type {String}
             */
            this.classType = "CGSGNodeEllipse";

            this.pickNodeMethod = CGSGPickNodeMethod.GHOST;
        },

        /**
         * Custom rendering
         * @method render
         * @protected
         * @param c {CanvasRenderingContext2D} the context into render the node
         * */
        render: function (c) {
            var centerX = this.dimension.width / 2;

            c.beginPath();

            c.moveTo(centerX, 0);

            c.bezierCurveTo(
                this._w, 0,
                this._w, this.dimension.height,
                centerX, this.dimension.height);

            c.bezierCurveTo(
                this._mw, this.dimension.height,
                this._mw, 0,
                centerX, 0);

            c.fill();
            if (this.lineWidth > 0) {
                c.stroke();
            }

            c.closePath();
        },

        _computeWmW: function () {
            this._w = this.dimension.width * this._f;
            this._mw = this.dimension.width * this._mf;
        },

        /**
         * Replace current dimension by these new ones and compute new Points
         * @method resizeTo
         * @param {Number} w
         * @param {Number} h
         * */
        resizeTo: function (w, h) {
            this._super(w, h);

            this._computeWmW();
        },

        /**
         * Multiply current dimension by these new ones
         * @method resizeTBy
         * @param wf {Number} width Factor
         * @param hf {Number} height Factor
         * */
        resizeBy: function (wf, hf) {
            this._super(wf, hf);

            this._computeWmW();
        },

        /**
         * Increase/decrease current dimension with adding values
         * @method resizeWith
         * @param w {Number} width
         * @param h {Number} height
         * */
        resizeWith: function (w, h) {
            this._super(w, h);

            this._computeWmW();
        },

        /**
         * @method copy
         * @return {CGSGNodeEllipse} a copy of this node
         */
        copy: function () {
            var node = new CGSGNodeEllipse(this.position.x, this.position.y, this.dimension.width,
                                           this.dimension.height);
            //call the super method
            return this._super(node);
        }
    }
);
