# AUTO GENERATED FILE - DO NOT EDIT

#' @export
moonThreejs <- function(id=NULL, height=NULL, nforests=NULL, ntrees=NULL, radius=NULL) {
    
    props <- list(id=id, height=height, nforests=nforests, ntrees=ntrees, radius=radius)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'MoonThreejs',
        namespace = 'moon_threejs',
        propNames = c('id', 'height', 'nforests', 'ntrees', 'radius'),
        package = 'moonThreejs'
        )

    structure(component, class = c('dash_component', 'list'))
}
