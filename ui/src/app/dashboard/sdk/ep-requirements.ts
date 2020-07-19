/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {Datatypes} from "./model/datatypes";
import {Vocabulary} from "./model/vocabulary";
import {
    EventPropertyPrimitive,
    EventPropertyUnion
} from "../../core-model/gen/streampipes-model";

export class EpRequirements {

    private static ep(): EventPropertyPrimitive {
        // TODO factories for properties
        let ep = new EventPropertyPrimitive();
        ep["@class"] = "org.apache.streampipes.model.schema.EventPropertyPrimitive";
        return ep;
    }

    static anyProperty(): EventPropertyUnion {
        return EpRequirements.ep();
    }

    static imageReq(): EventPropertyUnion {
        return EpRequirements.domainPropertyReq("https://image.com");
    }

    static latitudeReq(): EventPropertyUnion {
        return EpRequirements.domainPropertyReq(Vocabulary.GEO + "lat");
    }

    static longitudeReq(): EventPropertyUnion {
        return EpRequirements.domainPropertyReq(Vocabulary.GEO + "long")
    }

    static timestampReq(): EventPropertyUnion {
        return EpRequirements.domainPropertyReq("http://schema.org/DateTime");
    }

    static numberReq(): EventPropertyUnion {
        return EpRequirements.datatypeReq(Datatypes.Number);
    }

    static stringReq(): EventPropertyUnion {
        return EpRequirements.datatypeReq(Datatypes.String);
    }

    static integerReq(): EventPropertyUnion {
        return EpRequirements.datatypeReq(Datatypes.Integer);
    }

    static domainPropertyReq(domainProperty: string): EventPropertyPrimitive {
        let eventProperty = EpRequirements.ep();
        eventProperty.domainProperties = [domainProperty];
        return eventProperty;

    }

    static datatypeReq(datatype: Datatypes): EventPropertyPrimitive {
        let eventProperty = EpRequirements.ep();
        eventProperty.runtimeType = datatype.toUri();
        return eventProperty;
    }


}