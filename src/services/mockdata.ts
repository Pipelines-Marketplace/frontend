export const mockData = [
  {
    id: 1,
    Name: 'golang',
    Version: '1.12',
    Category: 'build',
    Description: 'These Tasks are Golang task to build Go projects.',
    Ratings: '',
    YAML: {
      apiVersion: 'tekton.dev/v1alpha1',
      kind: 'Task',
      metadata: {
        name: 'golang-build',
      },
      spec: {
        inputs: {
          params: [
            {
              name: 'package',
              description: 'base package to build in',
            },
            {
              name: 'packages',
              description: 'packages to build (default: ./cmd/...)',
              default: './cmd/...',
            },
            {
              name: 'version',
              description: 'golang version to use for builds',
              default: '1.12',
            },
            {
              name: 'flags',
              description: 'flags to use for the test command',
              default: '-v',
            },
            {
              name: 'GOOS',
              description: 'running program\'s operating system target',
              default: 'linux',
            },
            {
              name: 'GOARCH',
              description: 'running program\'s architecture target',
              default: 'amd64',
            },
            {
              name: 'GO111MODULE',
              description: 'value of module support',
              default: 'auto',
            },
          ],
          resources: [
            {
              name: 'source',
              type: 'git',
              targetPath: 'src/$(inputs.params.package)',
            },
          ],
        },
        steps: [
          {
            name: 'build',
            image: 'golang:$(inputs.params.version)',
            workingdir: '/workspace/src/$(inputs.params.package)',
            command: ['/bin/bash'],
            args: [
              '-c',
              'go build $(inputs.params.flags) $(inputs.params.packages)',
            ],
            env: [
              {
                name: 'GOPATH',
                value: '/workspace',
              },
              {
                name: 'GOOS',
                value: '$(inputs.params.GOOS)',
              },
              {
                name: 'GOARCH',
                value: '$(inputs.params.GOARCH)',
              },
              {
                name: 'GO111MODULE',
                value: '$(inputs.params.GO111MODULE)',
              },
            ],
          },
        ],
      },
    },
    Example: '',
    Tags: ['build', 'task', 'go'],
    Github: 'https://github.com/tektoncd/catalog/tree/master/golang',
  },
  {
    id: 2,
    Name: 'Buildah',
    Version: '',
    Category: 'build',
    Description:
      'This Task builds source into a container image using Project Atomic\'s Buildah build tool. It uses Buildah\'s support for building from Dockerfiles, using its buildah bud command. This command executes the directives in the Dockerfile to assemble a container image, then pushes that image to a container registry.',
    Ratings: '',
    YAML: {
      apiVersion: 'tekton.dev/v1alpha1',
      kind: 'Task',
      metadata: {
        name: 'buildah',
      },
      spec: {
        inputs: {
          params: [
            {
              name: 'BUILDER_IMAGE',
              description: 'The location of the buildah builder image.',
              default: 'quay.io/buildah/stable',
            },
            {
              name: 'DOCKERFILE',
              description: 'Path to the Dockerfile to build.',
              default: './Dockerfile',
            },
            {
              name: 'TLSVERIFY',
              description:
                'Verify the TLS on the registry endpoint (for push/pull to a non-TLS registry)',
              default: 'true',
            },
          ],
          resources: [
            {
              name: 'source',
              type: 'git',
            },
          ],
        },
        outputs: {
          resources: [
            {
              name: 'image',
              type: 'image',
            },
          ],
        },
        steps: [
          {
            name: 'build',
            image: '$(inputs.params.BUILDER_IMAGE)',
            workingDir: '/workspace/source',
            command: [
              'buildah',
              'bud',
              '--tls-verify=$(inputs.params.TLSVERIFY)',
              '--layers',
              '-f',
              '$(inputs.params.DOCKERFILE)',
              '-t',
              '$(outputs.resources.image.url)',
              '.',
            ],
            volumeMounts: [
              {
                name: 'varlibcontainers',
                mountPath: '/var/lib/containers',
              },
            ],
            securityContext: {
              privileged: true,
            },
          },
          {
            name: 'push',
            image: '$(inputs.params.BUILDER_IMAGE)',
            workingDir: '/workspace/source',
            command: [
              'buildah',
              'push',
              '--tls-verify=$(inputs.params.TLSVERIFY)',
              '$(outputs.resources.image.url)',
              'docker://$(outputs.resources.image.url)',
            ],
            volumeMounts: [
              {
                name: 'varlibcontainers',
                mountPath: '/var/lib/containers',
              },
            ],
            securityContext: {
              privileged: true,
            },
          },
        ],
        volumes: [
          {
            name: 'varlibcontainers',
            emptyDir: {},
          },
        ],
      },
    },
    Example: '',
    Tags: ['dockerfile', 'builder_image', 'buildah'],
    Github: 'https://github.com/tektoncd/catalog/tree/master/buildah',
  },
  {
    id: 3,
    Name: 'Kaniko',
    Version: 'v0.13.0',
    Category: 'build',
    Description:
      'This Task builds source into a container image using Google\'s kaniko tool.',
    Ratings: '',
    YAML: {
      apiVersion: 'tekton.dev/v1alpha1',
      kind: 'Task',
      metadata: {
        name: 'kaniko',
      },
      spec: {
        inputs: {
          params: [
            {
              name: 'DOCKERFILE',
              description: 'Path to the Dockerfile to build.',
              default: './Dockerfile',
            },
            {
              name: 'CONTEXT',
              description: 'The build context used by Kaniko.',
              default: './',
            },
          ],
          resources: [
            {
              name: 'source',
              type: 'git',
            },
          ],
        },
        outputs: {
          resources: [
            {
              name: 'image',
              type: 'image',
            },
          ],
        },
        steps: [
          {
            name: 'build-and-push',
            workingdir: '/workspace/source',
            image: 'gcr.io/kaniko-project/executor:v0.13.0',
            env: [
              {
                name: 'DOCKER_CONFIG',
                value: '/builder/home/.docker',
              },
            ],
            command: [
              '/kaniko/executor',
              '--dockerfile=$(inputs.params.DOCKERFILE)',
              '--context=/workspace/source/$(inputs.params.CONTEXT)',
              '--destination=$(outputs.resources.image.url)',
            ],
          },
        ],
      },
    },
    Example: '',
    Tags: ['dockerfile', 'kaniko'],
    Github: 'https://github.com/tektoncd/catalog/tree/master/kaniko',
  },
  {
    id: 4,
    Name: 'Source-to-Image',
    Version: '',
    Category: 'build',
    Description:
      'Source-to-Image (S2I) is a toolkit and workflow for building reproducible container images from source code. S2I produces images by injecting source code into a base S2I container image and letting the container prepare that source code for execution. The base S2I container images contains the language runtime and build tools needed for building and running the source code.',
    Ratings: '',
    YAML: {
      apiVersion: 'tekton.dev/v1alpha1',
      kind: 'Task',
      metadata: {
        name: 's2i',
      },
      spec: {
        inputs: {
          resources: [
            {
              name: 'source',
              type: 'git',
            },
          ],
          params: [
            {
              name: 'BUILDER_IMAGE',
              description: 'The location of the s2i builder image.',
            },
            {
              name: 'PATH_CONTEXT',
              description: 'The location of the path to run s2i from.',
              default: '.',
            },
            {
              name: 'TLSVERIFY',
              description:
                'Verify the TLS on the registry endpoint (for push/pull to a non-TLS registry)',
              default: 'true',
            },
          ],
        },
        outputs: {
          resources: [
            {
              name: 'image',
              type: 'image',
            },
          ],
        },
        steps: [
          {
            name: 'generate',
            image: 'quay.io/openshift-pipeline/s2i',
            workingdir: '/workspace/source',
            command: [
              's2i',
              'build',
              '$(inputs.params.PATH_CONTEXT)',
              '$(inputs.params.BUILDER_IMAGE)',
              '--as-dockerfile',
              '/gen-source/Dockerfile.gen',
            ],
            volumeMounts: [
              {
                name: 'gen-source',
                mountPath: '/gen-source',
              },
            ],
          },
          {
            name: 'build',
            image: 'quay.io/buildah/stable',
            workingdir: '/gen-source',
            command: [
              'buildah',
              'bud',
              '--tls-verify=$(inputs.params.TLSVERIFY)',
              '--layers',
              '-f',
              '/gen-source/Dockerfile.gen',
              '-t',
              '$(outputs.resources.image.url)',
              '.',
            ],
            volumeMounts: [
              {
                name: 'varlibcontainers',
                mountPath: '/var/lib/containers',
              },
              {
                name: 'gen-source',
                mountPath: '/gen-source',
              },
            ],
            securityContext: {
              privileged: true,
            },
          },
          {
            name: 'push',
            image: 'quay.io/buildah/stable',
            command: [
              'buildah',
              'push',
              '--tls-verify=$(inputs.params.TLSVERIFY)',
              '$(outputs.resources.image.url)',
              'docker://$(outputs.resources.image.url)',
            ],
            volumeMounts: [
              {
                name: 'varlibcontainers',
                mountPath: '/var/lib/containers',
              },
            ],
            securityContext: {
              privileged: true,
            },
          },
        ],
        volumes: [
          {
            name: 'varlibcontainers',
            emptyDir: {},
          },
          {
            name: 'gen-source',
            emptyDir: {},
          },
        ],
      },
    },
    Example: '',
    Tags: ['ocp', 'openshift', 's2i'],
    Github: 'https://github.com/tektoncd/catalog/tree/master/s2i',
  },
  {
    id: 5,
    Name: 'Jib Maven',
    Version: '1.6.1',
    Category: 'build',
    Description:
      'This Task builds Java/Kotlin/Groovy/Scala source into a container image using Google\'s Jib tool.Jib works with Maven and Gradle projects, and this template is for Maven projects',
    Ratings: '',
    YAML: {
      apiVersion: 'tekton.dev/v1alpha1',
      kind: 'Task',
      metadata: {
        name: 'jib-maven',
      },
      spec: {
        inputs: {
          params: [
            {
              name: 'DIRECTORY',
              description:
                'The directory containing the app, relative to the source repository root',
              default: '.',
            },
            {
              name: 'CACHE',
              description:
                'The name of the volume for caching Maven artifacts and base image layers',
              default: 'empty-dir-volume',
            },
          ],
          resources: [
            {
              name: 'source',
              type: 'git',
            },
          ],
        },
        outputs: {
          resources: [
            {
              name: 'image',
              type: 'image',
            },
          ],
        },
        steps: [
          {
            name: 'build-and-push',
            image: 'gcr.io/cloud-builders/mvn',
            command: [
              'mvn',
              'compile',
              'com.google.cloud.tools:jib-maven-plugin:build',
              '-Duser.home=/builder/home',
              '-Dimage=$(outputs.resources.image.url)',
            ],
            workingDir: '/workspace/source/$(inputs.params.DIRECTORY)',
            volumeMounts: [
              {
                name: '$(inputs.params.CACHE)',
                mountPath: '/builder/home/.m2',
                subPath: 'm2-cache',
              },
              {
                name: '$(inputs.params.CACHE)',
                mountPath: '/builder/home/.cache',
                subPath: 'jib-cache',
              },
            ],
          },
        ],
        volumes: [
          {
            name: 'empty-dir-volume',
            emptyDir: {},
          },
        ],
      },
    },
    Example: '',
    Tags: ['maven', 'java', 'scala', 'kotlin'],
    Github: 'https://github.com/tektoncd/catalog/tree/master/jib-maven',
  },
  {
    id: 6,
    Name: 'gcloud',
    Version: '',
    Category: 'deploy',
    Description:
      'This task performs operations on Google Cloud Platform resources using gcloud.',
    Ratings: '',
    YAML: {
      apiVersion: 'tekton.dev/v1alpha1',
      kind: 'Task',
      metadata: {
        name: 'gcloud',
      },
      spec: {
        inputs: {
          params: [
            {
              name: 'gcloud-image',
              description: 'gcloud CLI container image to run this task',
              default: 'google/cloud-sdk:slim',
            },
            {
              name: 'ARGS',
              type: 'array',
              description: 'gcloud CLI arguments to run',
              default: ['help'],
            },
          ],
        },
        steps: [
          {
            name: 'gcloud',
            image: '$(inputs.params.gcloud-image)',
            command: ['/usr/bin/gcloud'],
            args: ['$(inputs.params.ARGS)'],
          },
        ],
      },
    },
    Example: '',
    Tags: ['gcloud-image', 'google', 'deploy'],
    Github: 'https://github.com/tektoncd/catalog/tree/master/gcloud',
  },
  {
    id: 7,
    Name: 'Knative with kn',
    Version: '',
    Category: 'build',
    Description:
      'This Task performs operations on Knative resources (services, revisions, routes) using kn CLI.',
    Ratings: '',
    YAML: {
      apiVersion: 'tekton.dev/v1alpha1',
      kind: 'Task',
      metadata: {
        name: 'kn',
      },
      spec: {
        inputs: {
          params: [
            {
              name: 'kn-image',
              description: 'kn CLI container image to run this task',
              default:
                'gcr.io/knative-releases/github.com/knative/client/cmd/kn',
            },
            {
              name: 'ARGS',
              type: 'array',
              description: 'kn CLI arguments to run',
              default: ['help'],
            },
          ],
          resources: [
            {
              name: 'image',
              type: 'image',
            },
          ],
        },
        steps: [
          {
            name: 'kn',
            image: '$(inputs.params.kn-image)',
            command: ['/ko-app/kn'],
            args: ['$(inputs.params.ARGS)'],
          },
        ],
      },
    },
    Example: '',
    Tags: ['knative'],
    Github: 'https://github.com/tektoncd/catalog/tree/master/kn',
  },
  {
    id: 8,
    Name: 'OpenShift Client Task',
    Version: 'openshift-cli:0.5.0',
    Category: 'deploy',
    Description:
      'OpenShift is a Kubernetes distribution from Red Hat which provides oc, the OpenShift CLI that complements kubectl for simplifying deployment and configuration applications on OpenShift.',
    Ratings: '',
    YAML: {
      apiVersion: 'tekton.dev/v1alpha1',
      kind: 'Task',
      metadata: {
        name: 'openshift-client',
      },
      spec: {
        inputs: {
          params: [
            {
              name: 'ARGS',
              description: 'The OpenShift CLI arguments to run',
              default: 'help',
            },
          ],
        },
        steps: [
          {
            name: 'oc',
            image: 'quay.io/openshift-pipeline/openshift-cli:0.5.0',
            command: ['/usr/local/bin/oc'],
            args: ['$(inputs.params.ARGS)'],
          },
        ],
      },
    },
    Example: '',
    Tags: ['openshift-client'],
    Github: 'https://github.com/tektoncd/catalog/tree/master/openshift-client',
  },
  {
    id: 9,
    Name: 'Kubeval',
    Version: '',
    Category: 'build',
    Description:
      'This task makes it possible to use Kubeval within your Tekton pipelines. Kubeval is a tool used for validating Kubernetes configuration files.',
    Ratings: '',
    YAML: {
      apiVersion: 'tekton.dev/v1alpha1',
      kind: 'Task',
      metadata: {
        name: 'kubeval',
      },
      spec: {
        inputs: {
          resources: [
            {
              name: 'source',
              type: 'git',
              targetPath: 'source',
            },
          ],
          params: [
            {
              name: 'files',
              default: '.',
            },
            {
              name: 'output',
              default: 'stdout',
            },
            {
              name: 'args',
              type: 'array',
              default: [],
            },
          ],
        },
        steps: [
          {
            name: 'kubeval',
            workingdir: '/workspace/source',
            image: 'garethr/kubeval:latest',
            command: [
              'kubeval',
              '-d',
              '$(inputs.params.files)',
              '-o',
              '$(inputs.params.output)',
            ],
          },
        ],
      },
    },
    Example: '',
    Tags: ['Kubeval', 'Kubernetes'],
    Github: 'https://github.com/tektoncd/catalog/tree/master/openshift-client',
  },
  {
    id: 10,
    Name: 'OpenWhisk Runtimes for Knative',
    Version: '',
    Category: 'build',
    Description:
      'It contains Tekton Task which can be used to Build and Serve Knative compatible applications (i.e., OpenWhisk Actions) on Kubernetes.',
    Ratings: '',
    YAML: {
      apiVersion: 'tekton.dev/v1alpha1',
      kind: 'Task',
      metadata: {
        name: 'openwhisk',
      },
      spec: {
        inputs: {
          resources: [
            {
              name: 'runtime-git',
              type: 'git',
            },
          ],
          params: [
            {
              name: 'DOCKERFILE',
              description:
                'The path to the dockerfile to build from Runtime Repo',
            },
            {
              name: 'OW_RUNTIME_DEBUG',
              description: 'flag to indicate debug mode should be on/off',
              default: 'false',
            },
            {
              name: 'OW_RUNTIME_PLATFORM',
              description:
                'flag to indicate the platform, one of ["openwhisk", "knative", ... ]',
              default: 'knative',
            },
            {
              name: 'OW_ACTION_NAME',
              description: 'name of the action',
              default: '',
            },
            {
              name: 'OW_ACTION_CODE',
              description: 'JavaScript source code to be evaluated',
              default: '',
            },
            {
              name: 'OW_ACTION_MAIN',
              description:
                'name of the function in the "__OW_ACTION_CODE" to call as the action handler',
              default: 'main',
            },
            {
              name: 'OW_ACTION_BINARY',
              description:
                'flag to indicate zip function, for zip actions, "__OW_ACTION_CODE" must be base64 encoded string',
              default: 'false',
            },
            {
              name: 'OW_HTTP_METHODS',
              description:
                'list of HTTP methods, any combination of [GET, POST, PUT, and DELETE], default is [POST]',
              default: '[POST]',
            },
            {
              name: 'OW_ACTION_RAW',
              description:
                'flag to indicate raw HTTP handling, interpret and process an incoming HTTP body directly',
              default: 'false',
            },
            {
              name: 'OW_PROJECT_URL',
              description:
                'Location to local or remote file storage or public or private GitHub repo from where action source code needs to be evaluated',
              default: '',
            },
          ],
        },
        outputs: {
          resources: [
            {
              name: 'runtime-image',
              type: 'image',
            },
          ],
        },
        steps: [
          {
            name: 'add-ow-env-to-dockerfile',
            image: 'ubuntu',
            command: ['bash'],
            args: [
              '-c',
              'if [ -z $(inputs.params.OW_PROJECT_URL) ]; then\n  OW_ACTION_CODE="$(inputs.params.OW_ACTION_CODE)"\nelse\n  TEMPDIR="knative-"$((1 + RANDOM % 100))\n  TEMPFILE=`basename "$(inputs.params.OW_PROJECT_URL)"`\n  mkdir $TEMPDIR\n  cd $TEMPDIR\n  wget -O $TEMPFILE "$(inputs.params.OW_PROJECT_URL)"\n  if [ "$(inputs.params.OW_ACTION_BINARY)" = true ]; then\n      OW_ACTION_CODE=`base64 $TEMPFILE | tr -d \'[:space:]\'`\n  else\n      OW_ACTION_CODE=`cat $TEMPFILE`\n  fi\n  cd ..\nfi\ncat <<EOF >> $(inputs.params.DOCKERFILE)\n  ENV __OW_RUNTIME_DEBUG "$(inputs.params.OW_RUNTIME_DEBUG)"\n  ENV __OW_RUNTIME_PLATFORM "$(inputs.params.OW_RUNTIME_PLATFORM)"\n  ENV __OW_ACTION_NAME "$(inputs.params.OW_ACTION_NAME)"\n  ENV __OW_ACTION_CODE "$(OW_ACTION_CODE)"\n  ENV __OW_ACTION_MAIN "$(inputs.params.OW_ACTION_MAIN)"\n  ENV __OW_ACTION_BINARY "$(inputs.params.OW_ACTION_BINARY)"\n  ENV __OW_HTTP_METHODS "$(inputs.params.OW_HTTP_METHODS)"\n  ENV __OW_ACTION_RAW "$(inputs.params.OW_ACTION_RAW)"\n  ENV __OW_PROJECT_URL "$(inputs.params.OW_PROJECT_URL)"\nEOF\n',
            ],
          },
          {
            name: 'update-dockerfile-for-tekton',
            image: 'ubuntu',
            command: ['sed'],
            args: [
              '-i',
              '-e',
              's/COPY ./COPY .\\/runtime-git/g',
              '$(inputs.params.DOCKERFILE)',
            ],
          },
          {
            name: 'build-openwhisk-nodejs-runtime',
            image: 'gcr.io/kaniko-project/executor:latest',
            command: ['/kaniko/executor'],
            args: [
              '--dockerfile=$(inputs.params.DOCKERFILE)',
              '--destination=$(outputs.resources.runtime-image.url)',
            ],
          },
        ],
      },
    },
    Example: '',
    Tags: ['dockerfile', 'Tekton-Pipeline'],
    Github: 'https://github.com/tektoncd/catalog/tree/master/openshift-client',
  },
];
