/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

define(
    [],
    function () {

        function ConductorRepresenter(
            conductor,
            scope,
            element
        ) {
            this.conductor = conductor;
            this.scope = scope;
            this.element = element;

            this.boundsListener = undefined;
            this.timeSystemListener = undefined;
        }

        // Handle a specific representation of a specific domain object
        ConductorRepresenter.prototype.represent = function represent(representation) {
            if (representation.key === 'browse-object') {
                this.destroy();

                var scope = this.scope,
                    conductor = this.conductor;

                this.boundsListener = conductor.on("bounds", function (bounds) {
                    if (!conductor.follow()) {
                        scope.$broadcast('telemetry:display:bounds', {
                            start: bounds.start,
                            end: bounds.end,
                            domain: conductor.timeSystem().metadata.key
                        });
                    }
                });

                this.timeSystemListener = conductor.on("timeSystem", function (timeSystem) {
                    var bounds = conductor.bounds();
                    scope.$broadcast('telemetry:display:bounds', {
                        start: bounds.start,
                        end: bounds.end,
                        domain: timeSystem.metadata.key
                    });
                });
            }
        };

        ConductorRepresenter.prototype.destroy = function destroy() {
            if (this.boundsListener)
                this.boundsListener();

            if (this.timeSystemListener)
                this.timeSystemListener();
        };

        return ConductorRepresenter;
    }
);

