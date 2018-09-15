/*
 * Copyright 2018 FZI Forschungszentrum Informatik
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package org.streampipes.connect.adapter.generic;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.streampipes.connect.adapter.Adapter;
import org.streampipes.connect.adapter.AdapterRegistry;
import org.streampipes.connect.adapter.generic.pipeline.AdapterPipeline;
import org.streampipes.connect.adapter.generic.pipeline.AdapterPipelineElement;
import org.streampipes.connect.adapter.generic.pipeline.elements.SendToKafkaAdapterSink;
import org.streampipes.connect.adapter.generic.pipeline.elements.TransformSchemaAdapterPipelineElement;
import org.streampipes.connect.exception.AdapterException;
import org.streampipes.model.connect.adapter.AdapterDescription;
import org.streampipes.model.connect.adapter.GenericAdapterDescription;
import org.streampipes.model.connect.adapter.GenericAdapterStreamDescription;
import org.streampipes.model.connect.guess.GuessSchema;
import org.streampipes.connect.adapter.generic.format.Format;
import org.streampipes.connect.adapter.generic.format.Parser;
import org.streampipes.connect.adapter.generic.protocol.Protocol;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class GenericDataStreamAdapter extends GenericAdapter {

    public static final String ID = GenericAdapterStreamDescription.ID;

    private Protocol protocol;

    private GenericAdapterStreamDescription adapterDescription;

    Logger logger = LoggerFactory.getLogger(Adapter.class);

    public GenericDataStreamAdapter() {
        super();
    }

    public GenericDataStreamAdapter(GenericAdapterStreamDescription adapterDescription, boolean debug) {
        super(debug);
        this.adapterDescription = adapterDescription;
    }

    public GenericDataStreamAdapter(GenericAdapterStreamDescription adapterDescription) {
        super();
        this.adapterDescription = adapterDescription;
    }

    @Override
    public AdapterDescription declareModel() {
        AdapterDescription adapterDescription = new GenericAdapterStreamDescription();
        adapterDescription.setAdapterId(GenericAdapterStreamDescription.ID);
        adapterDescription.setUri(GenericAdapterStreamDescription.ID);
        return adapterDescription;
    }

    @Override
    public Adapter getInstance(AdapterDescription adapterDescription) {
        return  new GenericDataStreamAdapter((GenericAdapterStreamDescription) adapterDescription);
    }

    @Override
    public String getId() {
        return ID;
    }

    public void stopAdapter() {
        protocol.stop();
    }

    @Override
    public GenericAdapterDescription getAdapterDescription() {
        return adapterDescription;
    }

    @Override
    public void setProtocol(Protocol protocol) {
       this.protocol = protocol;
    }
}
