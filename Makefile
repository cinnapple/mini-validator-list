ETL_IMAGE := cinnapple/minivalist-etl
API_IMAGE := cinnapple/minivalist-api
WEB_IMAGE := cinnapple/minivalist-web

build:
	cd etl && yarn install && yarn build && cd ..
	cd web && yarn install && yarn build && cd ..

build-image:
	docker build etl -t $(ETL_IMAGE)
	docker build api -t $(API_IMAGE)
	docker build web -t $(WEB_IMAGE)

push-image:
	docker image push $(ETL_IMAGE)
	docker image push $(API_IMAGE)
	docker image push $(WEB_IMAGE)
