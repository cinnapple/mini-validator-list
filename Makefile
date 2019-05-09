ETL_IMAGE := cinnapple/minivalist-etl
STR_IMAGE := cinnapple/minivalist-streaming
API_IMAGE := cinnapple/minivalist-api
WEB_IMAGE := cinnapple/minivalist-web

build:
	cd shared && yarn install && cd ..
	cd etl && yarn install && yarn build && cd ..
	cd streaming && yarn install && yarn build && cd ..
	cd web && yarn install && yarn build && cd ..

build-image:
	docker build etl -t $(ETL_IMAGE)
	docker build streaming -t $(STR_IMAGE)
	docker build api -t $(API_IMAGE)
	docker build web -t $(WEB_IMAGE)

push-image:
	docker image push $(ETL_IMAGE)
	docker image push $(STR_IMAGE)
	docker image push $(API_IMAGE)
	docker image push $(WEB_IMAGE)

protoc:
	cd shared/proto-src && sh ./protoc.sh echo.proto && cd ../..
	cp shared/proto-src/*.proto streaming/bin/
	cd web && yarn add ../shared && cd ..
