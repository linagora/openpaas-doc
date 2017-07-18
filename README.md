# OpenPaaS Documentation website

This is the documentation repository for [https://docs.open-paas.org](https://docs.open-paas.org).

## Layout

To keep things clear and clean, each OP module must follow the same rules:

1. Sources goes into `_docs/modules/MODULE_NAME/`
2. Each module has an `index.md` file introducing the module i.e. `_docs/modules/MODULE_NAME/index.md`
3. The module category is `OpenPaaS MODULE_NAME Module`
4. All module images are going into `images/modules/MODULE_NAME` folder. You can then access it in your markdown file like `![The image caption]({{ site.url }}/images/modules/MODULE_NAME/image.png)`

## Develop

The Web site is built using [jekyll](https://jekyllrb.com/). You can install jekyll, all its dependencies, cry, or simply run in Docker:

```
docker run --rm --label=jekyll --volume=$(pwd):/srv/jekyll -it -p 4000:4000 jekyll/jekyll jekyll serve
```

Open the browser on http://localhost:4000. Once some changes on the sources are detected, Jekyll will rebuild the Web site, you will just have to refresh your browser to get the new page.

### Tips and Tricks

#### Adding a ToC to a page

Thanks to [kramdown](https://github.com/gettalong/kramdown), which is the default markdown converter in latest Jekyll version, one can add a ToC to any page just with the following block

```
* Here is the ToC, this line is needed to generate... 
{:toc}
```

Note that the first line is required, it will not be displayed in the page, but ToC will not be generated if not set. For all the ToC options, have a look [here](https://kramdown.gettalong.org/converter/html.html#toc).

### Commits

Please send your changes as pull-requests following the OP coding rules.

### Push changes on docs.open-paas.org

You have nothing to do... Once your code has been merged into master, the repository is mirrored on [GitHub](https://github.com/linagora/openpaas-doc) which provides jekyll support out of the box.