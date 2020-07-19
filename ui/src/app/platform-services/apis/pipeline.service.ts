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

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PlatformServicesCommons} from "./commons.service";
import {Observable} from "rxjs";
import {Message, Pipeline} from "../../core-model/gen/streampipes-model";
import {map} from "rxjs/operators";

@Injectable()
export class PipelineService {

  constructor(private http: HttpClient,
              private platformServicesCommons: PlatformServicesCommons) {

  }

  getPipelineCategories() {
    return this.http.get(this.platformServicesCommons.authUserBasePath() + "/pipelinecategories");
  };

  storePipelineCategory(pipelineCategory) {
    return this.http.post(this.platformServicesCommons.authUserBasePath() + "/pipelinecategories", pipelineCategory);
  };

  deletePipelineCategory(categoryId) {
    return this.http.delete(this.platformServicesCommons.authUserBasePath() + "/pipelinecategories/" + categoryId);
  }

  startPipeline(pipelineId) {
    return this.http.get(this.platformServicesCommons.authUserBasePath() + "/pipelines/" + pipelineId + "/start");
  }

  stopPipeline(pipelineId) {
    return this.http.get(this.platformServicesCommons.authUserBasePath() + "/pipelines/" + pipelineId + "/stop");
  }

  getPipelineById(pipelineId): Observable<Pipeline> {
    return this.http.get(this.platformServicesCommons.authUserBasePath() + "/pipelines/" + pipelineId)
        .pipe(map(response => Pipeline.fromData(response as Pipeline)));
  }

  getPipelineStatusById(pipelineId) {
    return this.http.get(this.platformServicesCommons.authUserBasePath() + "/pipelines/" + pipelineId + "/status");
  }

  storePipeline(pipeline: Pipeline): Observable<Message> {
    return this.http.post(this.platformServicesCommons.authUserBasePath() + "/pipelines", pipeline)
        .pipe(map(response => {
          return Message.fromData(response as Message);
        }));
  }

  updatePipeline(pipeline: Pipeline): Observable<Message> {
    var pipelineId = pipeline._id;
    return this.http.put(this.platformServicesCommons.authUserBasePath() + "/pipelines/" + pipelineId, pipeline)
        .pipe(map(response => {
          return Message.fromData(response as Message);
        }));
  }

  getOwnPipelines(): Observable<Pipeline[]> {
    return this.http.get(this.platformServicesCommons.authUserBasePath() + "/pipelines/own").pipe(map(response => {
      return (response as any[]).map(p => Pipeline.fromData(p));
    }));
  };

  getSystemPipelines(): Observable<Pipeline[]> {
    return this.http.get(this.platformServicesCommons.authUserBasePath() + "/pipelines/system").pipe(map(response => {
      return (response as any[]).map(p => Pipeline.fromData(p));
    }))
  };

}