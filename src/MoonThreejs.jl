
module MoonThreejs
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.1"

include("jl/moonthreejs.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "moon_threejs",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "moon_threejs.min.js",
    external_url = "https://unpkg.com/moon_threejs@0.0.1/moon_threejs/moon_threejs.min.js",
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "moon_threejs.min.js.map",
    external_url = "https://unpkg.com/moon_threejs@0.0.1/moon_threejs/moon_threejs.min.js.map",
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
