# AUTO GENERATED FILE - DO NOT EDIT

#' @export
moonThreejs <- function(id=NULL, radius=NULL) {
    
    props <- list(id=id, radius=radius)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'MoonThreejs',
        namespace = 'moon_threejs',
        propNames = c('id', 'radius'),
        package = 'moonThreejs'
        )

    structure(component, class = c('dash_component', 'list'))
}
