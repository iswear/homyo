import Homyo from 'homyo-game'

export default (function() {
    const ULangUtil = Homyo.utils.LangUtil
    const UMatrixUtil = Homyo.utils.MatrixUtil
    const CNotifier = Homyo.core.Notifier
    const CApplication = Homyo.core.Application
    const CNode = Homyo.core.Node
    const GScene = Homyo.game.Scene
    const GMap = Homyo.game.Map
    const GNode = Homyo.game.Node
    const GUtil = Homyo.game.Util

    const GCtrl = (function() {
        const functions = {
            syncMode: function(sender, newVal, oldVal) {
                const app = sender.findApplication()
                if (app === null) {
                    return
                }
                app.refresh()
                const ctrlNodeX = sender._ctrlNodeX
                const ctrlNodeY = sender._ctrlNodeY
                const ctrlNodeRotateZ = sender._ctrlNodeRotateZ

                app.removeObserver('mousemove', functions.moveXMouseMove, sender, app)
                app.removeObserver('mouseup', functions.moveXMouseUp, sender, app)
                app.removeObserver('mousemove', functions.moveYMouseMove, sender, app)
                app.removeObserver('mouseup', functions.moveYMouseUp, sender, app)
                app.removeObserver('mousemove', functions.rotateMouseMove, sender, app)
                app.removeObserver('mouseup', functions.rotateMouseUp, sender, app)
                app.removeObserver('mousemove', functions.scaleXMouseMove, sender, app)
                app.removeObserver('mouseup', functions.scaleXMouseUp, sender, app)
                app.removeObserver('mousemove', functions.scaleYMouseMove, sender, app)
                app.removeObserver('mouseup', functions.scaleYMouseUp, sender, app)
                app.removeObserver('mousemove', functions.shearXMouseMove, sender, app)
                app.removeObserver('mouseup', functions.shearXMouseUp, sender, app)
                app.removeObserver('mousemove', functions.shearYMouseMove, sender, app)
                app.removeObserver('mouseup', functions.shearYMouseUp, sender, app)
                ctrlNodeX.removeObserver('mousedown', functions.moveXMouseDown, sender, ctrlNodeX)
                ctrlNodeX.removeObserver('mousedown', functions.scaleXMouseDown, sender, ctrlNodeX)
                ctrlNodeX.removeObserver('mousedown', functions.shearXMouseDown, sender, ctrlNodeX)
                ctrlNodeY.removeObserver('mousedown', functions.moveYMouseDown, sender, ctrlNodeY)
                ctrlNodeY.removeObserver('mousedown', functions.scaleYMouseDown, sender, ctrlNodeY)
                ctrlNodeY.removeObserver('mousedown', functions.shearYMouseDown, sender, ctrlNodeY)
                ctrlNodeRotateZ.removeObserver('mousedown', functions.rotateMouseDown, sender, ctrlNodeRotateZ)
                sender._ctrlContext.id = 0
                sender._ctrlContext.eventId = 0

                if (newVal === 1) {
                    // 移动
                    ctrlNodeX.visible = true
                    ctrlNodeY.visible = true
                    ctrlNodeRotateZ.visible = false
                    ctrlNodeX.addObserver('mousedown', functions.moveXMouseDown, sender, ctrlNodeX)
                    ctrlNodeY.addObserver('mousedown', functions.moveYMouseDown, sender, ctrlNodeY)
                    app.addObserver('mousemove', functions.moveXMouseMove, sender, app)
                    app.addObserver('mouseup', functions.moveXMouseUp, sender, app)
                    app.addObserver('mousemove', functions.moveYMouseMove, sender, app)
                    app.addObserver('mouseup', functions.moveYMouseUp, sender, app)
                } else if (newVal === 2) {
                    // 旋转
                    ctrlNodeX.visible = false
                    ctrlNodeY.visible = false
                    ctrlNodeRotateZ.visible = true
                    ctrlNodeRotateZ.addObserver('mousedown', functions.rotateMouseDown, sender, ctrlNodeRotateZ)
                    app.addObserver('mousemove', functions.rotateMouseMove, sender, app)
                    app.addObserver('mouseup', functions.rotateMouseUp, sender, app)
                } else if (newVal === 3) {
                    // 缩放
                    ctrlNodeX.visible = true
                    ctrlNodeY.visible = true
                    ctrlNodeRotateZ.visible = false
                    ctrlNodeX.addObserver('mousedown', functions.scaleXMouseDown, sender, ctrlNodeX)
                    ctrlNodeY.addObserver('mousedown', functions.scaleYMouseDown, sender, ctrlNodeY)
                    app.addObserver('mousemove', functions.scaleXMouseMove, sender, app)
                    app.addObserver('mouseup', functions.scaleXMouseUp, sender, app)
                    app.addObserver('mousemove', functions.scaleYMouseMove, sender, app)
                    app.addObserver('mouseup', functions.scaleYMouseUp, sender, app)
                } else if (newVal === 4) {
                    // 倾斜
                    ctrlNodeX.visible = true
                    ctrlNodeY.visible = true
                    ctrlNodeRotateZ.visible = false
                    ctrlNodeX.addObserver('mousedown', functions.shearXMouseDown, sender, ctrlNodeX)
                    ctrlNodeY.addObserver('mousedown', functions.shearYMouseDown, sender, ctrlNodeY)
                    app.addObserver('mousemove', functions.shearXMouseMove, sender, app)
                    app.addObserver('mouseup', functions.shearXMouseUp, sender, app)
                    app.addObserver('mousemove', functions.shearYMouseMove, sender, app)
                    app.addObserver('mouseup', functions.shearYMouseUp, sender, app)
                } else {
                    // 其他都忽略
                    ctrlNodeX.visible = false
                    ctrlNodeY.visible = false
                    ctrlNodeRotateZ.visible = false
                }
            },
            renderCtrlNodeX: function(sender, render) {
                let needRender = true
                switch (this.mode) {
                    case 1:
                        {
                            render.beginPath()
                            render.buildPath([
                                [6, 0],
                                [27, -6],
                                [36, 0],
                                [27, 6]
                            ])
                            render.closePath()
                            break
                        }
                    case 3:
                        {
                            render.beginPath()
                            render.buildPath([
                                [6, 0],
                                [27, -6],
                                [36, -6],
                                [36, 6],
                                [27, 6]
                            ])
                            render.closePath()
                            break
                        }
                    case 4:
                        {
                            render.beginPath()
                            render.buildPath([
                                [6, 0],
                                [12, -3],
                                [27, -3],
                                [30, -6],
                                [36, 0],
                                [30, 6],
                                [27, 3],
                                [12, 3]
                            ])
                            render.closePath()
                            break
                        }
                    default:
                        {
                            needRender = false
                            break
                        }
                }
                if (needRender) {
                    render.fillStyle = '#0f0'
                    render.fill()
                    render.lineWidth = 1
                    render.strokeStyle = '#222'
                    render.stroke()
                }
            },
            renderCtrlNodeY: function(sender, render) {
                let needRender = true
                switch (this.mode) {
                    case 1:
                        {
                            render.beginPath()
                            render.buildPath([
                                [0, 6],
                                [-6, 27],
                                [0, 36],
                                [6, 27]
                            ])
                            render.closePath()
                            break
                        }
                    case 3:
                        {
                            render.beginPath()
                            render.buildPath([
                                [0, 6],
                                [-6, 27],
                                [-6, 36],
                                [6, 36],
                                [6, 27]
                            ])
                            render.closePath()
                            break
                        }
                    case 4:
                        {
                            render.beginPath()
                            render.buildPath([
                                [0, 6],
                                [-3, 12],
                                [-3, 27],
                                [-6, 30],
                                [0, 36],
                                [6, 30],
                                [3, 27],
                                [3, 12]
                            ])
                            render.closePath()
                            break
                        }
                    default:
                        {
                            needRender = false
                            break
                        }
                }
                if (needRender) {
                    render.fillStyle = '#f00'
                    render.fill()
                    render.lineWidth = 1
                    render.strokeStyle = '#222'
                    render.stroke()
                }
            },
            renderCtrlNodeRotateZ: function(sender, render) {
                switch (this.mode) {
                    case 2:
                        {
                            render.beginPath()
                            render.arc(0, 0, 28, 0.5 * Math.PI - 0.4, 0.5 * Math.PI + 0.4, true)
                            render.lineTo(-11, 25)
                            render.arc(0, 0, 32, 0.5 * Math.PI + 0.4, 0.5 * Math.PI - 0.4, false)
                            render.lineTo(13, 31)
                            render.lineWidth = 1
                            render.strokeStyle = '#222'
                            render.stroke()
                            render.fillStyle = '#f00'
                            render.fill()

                            render.beginPath()
                            render.buildPath([
                                [0, 6],
                                [-3, 12],
                                [-3, 27],
                                [-6, 30],
                                [0, 36],
                                [6, 30],
                                [3, 27],
                                [3, 12]
                            ])
                            render.closePath()
                            render.fillStyle = '#f00'
                            render.fill()
                            render.lineWidth = 1
                            render.strokeStyle = '#222'
                            render.stroke()
                            break
                        }
                    default:
                        break
                }
            },
            moveXMouseDown: function(sender, e) {
                this.initCtrlContext(11, e)
            },
            moveXMouseMove: function(sender, e) {
                const context = this._ctrlContext
                if (context.bizId === 11 && context.eventId === e.id) {
                    const lStartOffset = UMatrixUtil.mulMat2DAndVect2D(context.reverseTransformInWorld, [context.eventStartOffset.x, context.eventStartOffset.y])
                    const lEndOffset = UMatrixUtil.mulMat2DAndVect2D(context.reverseTransformInWorld, [e.offsetX, e.offsetY])
                    const pStartOffset = this.transformLVectorToP([0, 0])
                    const pEndOffset = this.transformLVectorToP([lEndOffset[0] - lStartOffset[0], 0])
                    this.x = context.bizStartValue.x + pEndOffset[0] - pStartOffset[0]
                    this.y = context.bizStartValue.y + pEndOffset[1] - pStartOffset[1]
                }
            },
            moveXMouseUp: function(sender, e) {
                this.clearCtrlContext(11, e, false)
            },
            moveYMouseDown: function(sender, e) {
                this.initCtrlContext(12, e)
            },
            moveYMouseMove: function(sender, e) {
                const context = this._ctrlContext
                if (context.bizId === 12 && context.eventId === e.id) {
                    const lStartOffset = UMatrixUtil.mulMat2DAndVect2D(context.reverseTransformInWorld, [context.eventStartOffset.x, context.eventStartOffset.y])
                    const lEndOffset = UMatrixUtil.mulMat2DAndVect2D(context.reverseTransformInWorld, [e.offsetX, e.offsetY])
                    const pStartOffset = this.transformLVectorToP([0, 0])
                    const pEndOffset = this.transformLVectorToP([0, lEndOffset[1] - lStartOffset[1]])
                    this.x = context.bizStartValue.x + pEndOffset[0] - pStartOffset[0]
                    this.y = context.bizStartValue.y + pEndOffset[1] - pStartOffset[1]
                }
            },
            moveYMouseUp: function(sender, e) {
                this.clearCtrlContext(12, e, false)
            },
            rotateMouseDown: function(sender, e) {
                this.initCtrlContext(21, e, false)
            },
            rotateMouseMove: function(sender, e) {
                const context = this._ctrlContext
                if (context.bizId === 21 && context.eventId === e.id) {
                    const lStartOffset = UMatrixUtil.mulMat2DAndVect2D(context.reverseTransformInWorld, [context.eventStartOffset.x, context.eventStartOffset.y])
                    const lEndOffset = UMatrixUtil.mulMat2DAndVect2D(context.reverseTransformInWorld, [e.offsetX, e.offsetY])
                    this.rotateZ = context.bizStartValue.rotateZ + Math.atan2(lEndOffset[1], lEndOffset[0]) - Math.atan2(lStartOffset[1], lStartOffset[0])
                }
            },
            rotateMouseUp: function(sender, e) {
                this.clearCtrlContext(21, e, false)
            },
            scaleXMouseDown: function(sender, e) {
                this.initCtrlContext(31, e)
            },
            scaleXMouseMove: function(sender, e) {
                const context = this._ctrlContext
                if (context.bizId === 31 && context.eventId === e.id) {
                    const lStartOffset = UMatrixUtil.mulMat2DAndVect2D(context.reverseTransformInWorld, [context.eventStartOffset.x, context.eventStartOffset.y])
                    if (lStartOffset[0] > 0) {
                        const lEndOffset = UMatrixUtil.mulMat2DAndVect2D(context.reverseTransformInWorld, [e.offsetX, e.offsetY])
                        this.scaleX = context.bizStartValue.scaleX * lEndOffset[0] / lStartOffset[0]
                    }
                }
            },
            scaleXMouseUp: function(sender, e) {
                this.clearCtrlContext(31, e, false)
            },
            scaleYMouseDown: function(sender, e) {
                this.initCtrlContext(32, e)
            },
            scaleYMouseMove: function(sender, e) {
                const context = this._ctrlContext
                if (context.bizId === 32 && context.eventId === e.id) {
                    const lStartOffset = UMatrixUtil.mulMat2DAndVect2D(context.reverseTransformInWorld, [context.eventStartOffset.x, context.eventStartOffset.y])
                    if (lStartOffset[1] > 0) {
                        const lEndOffset = UMatrixUtil.mulMat2DAndVect2D(context.reverseTransformInWorld, [e.offsetX, e.offsetY])
                        this.scaleY = context.bizStartValue.scaleY * lEndOffset[1] / lStartOffset[1]
                    }
                }
            },
            scaleYMouseUp: function(sender, e) {
                this.clearCtrlContext(32, e, false)
            },
            shearXMouseDown: function(sender, e) {
                this.initCtrlContext(41, e)
            },
            shearXMouseMove: function(sender, e) {
                const context = this._ctrlContext
                if (context.bizId === 41 && context.eventId === e.id) {
                    const lStartOffset = UMatrixUtil.mulMat2DAndVect2D(context.reverseTransformInWorld, [context.eventStartOffset.x, context.eventStartOffset.y])
                    const lEndOffset = UMatrixUtil.mulMat2DAndVect2D(context.reverseTransformInWorld, [e.offsetX, e.offsetY])
                    this.shearY = context.bizStartValue.shearY + lEndOffset[1] / lEndOffset[0] - lStartOffset[1] / lStartOffset[0]
                }
            },
            shearXMouseUp: function(sender, e) {
                this.clearCtrlContext(41, e, false)
            },
            shearYMouseDown: function(sender, e) {
                this.initCtrlContext(42, e)
            },
            shearYMouseMove: function(sender, e) {
                const context = this._ctrlContext
                if (context.bizId === 42 && context.eventId === e.id) {
                    const lStartOffset = UMatrixUtil.mulMat2DAndVect2D(context.reverseTransformInWorld, [context.eventStartOffset.x, context.eventStartOffset.y])
                    const lEndOffset = UMatrixUtil.mulMat2DAndVect2D(context.reverseTransformInWorld, [e.offsetX, e.offsetY])
                    this.shearX = context.bizStartValue.shearX + lEndOffset[0] / lEndOffset[1] - lStartOffset[0] / lStartOffset[1]
                }
            },
            shearYMouseUp: function(sender, e) {
                this.clearCtrlContext(42, e, false)
            }
        }

        const InnerGCtrl = ULangUtil.extend(CNode)

        InnerGCtrl.prototype.defMode = 0
        InnerGCtrl.prototype.init = function(conf) {
            this.super('init', [conf])
            this.defineNotifyProperty('mode', ULangUtil.checkAndGet(conf.mode, this.defMode))

            this._ctrlNodeX = new CNode({ anchorX: 0, anchorY: 0.5, width: 36, height: 12, visible: false })
            this._ctrlNodeY = new CNode({ anchorX: 0.5, anchorY: 0, width: 12, height: 36, visible: false })
            this._ctrlNodeRotateZ = new CNode({ anchorX: 0.5, anchorY: 0, width: 12, height: 36, visible: false })
            this._ctrlContext = {
                bizId: 0,
                bizStartValue: {},
                eventId: 0,
                eventStartOffset: { x: 0, y: 0 }
            }

            functions.syncMode.call(this, this, this.mode, 0)

            this._ctrlNodeX.addObserver('render', functions.renderCtrlNodeX, this, this._ctrlNodeX)
            this._ctrlNodeY.addObserver('render', functions.renderCtrlNodeY, this, this._ctrlNodeY)
            this._ctrlNodeRotateZ.addObserver('render', functions.renderCtrlNodeRotateZ, this, this._ctrlNodeRotateZ)

            this.appendChildNodeToLayer(this._ctrlNodeX, ULangUtil.checkAndGet(conf.ctrlLayer, 0))
            this.appendChildNodeToLayer(this._ctrlNodeY, ULangUtil.checkAndGet(conf.ctrlLayer, 0))
            this.appendChildNodeToLayer(this._ctrlNodeRotateZ, ULangUtil.checkAndGet(conf.ctrlLayer, 0))

            this.addObserver('modeChanged', functions.syncMode, this, this)
        }

        InnerGCtrl.prototype.initCtrlContext = function(bizId, e) {
            const context = this._ctrlContext
            if (context.bizId === 0) {
                context.bizId = bizId
                context.eventId = e.id
                context.bizStartValue.x = this.x
                context.bizStartValue.y = this.y
                context.bizStartValue.rotateZ = this.rotateZ
                context.bizStartValue.scaleX = this.scaleX
                context.bizStartValue.scaleY = this.scaleY
                context.bizStartValue.shearX = this.shearX
                context.bizStartValue.shearY = this.shearY
                context.eventStartOffset.x = e.offsetX
                context.eventStartOffset.y = e.offsetY
                context.transformInParent = this.getTransformInParent()
                context.reverseTransformInParent = this.getReverseTransformInParent()
                context.transformInWorld = this.getTransformInWorld()
                context.reverseTransformInWorld = this.getReverseTransformInWorld()
                e.bubble = false
            }
        }

        InnerGCtrl.prototype.clearCtrlContext = function(bizId, e, force) {
            const context = this._ctrlContext
            if (force || (context.bizId === bizId && context.eventId === e.id)) {
                context.bizId = 0
                context.eventId = 0
            }
        }

        return InnerGCtrl
    })()

    const GBone = (function() {
        const functions = {
            syncType: function(sender, newVal, oldVal) {
                if (newVal === 1) {
                    this._textureBone.removeObserver('render', functions.renderTextureBone, this, this._textureBone)
                    this.addObserver('render', functions.renderNodeBone, this, this)
                } else {
                    this._textureBone.addObserver('render', functions.renderTextureBone, this, this._textureBone)
                    this.removeObserver('render', functions.renderNodeBone, this, this)
                }
            },
            renderNodeBone: function(sender, render) {
                // 绘制剪头
                const rect = sender.getRectInLocal()
                if (rect.height > 5) {
                    render.beginPath()
                    render.buildPath([
                        [-2, 2],
                        [-4, 4],
                        [0, rect.height],
                        [4, 4],
                        [2, 2]
                    ])
                    render.arc(0, 0, 4, Math.PI * 0.25, Math.PI * 0.75, true)
                    render.closePath()
                    render.fillStyle = '#ff0'
                    render.fill()
                    render.lineWidth = 1
                    render.strokeStyle = '#222'
                    render.stroke()
                } else {
                    render.beginPath()
                    render.arc(0, 0, 4, 0, Math.PI * 2, false)
                    render.fillStyle = '#ff0'
                    render.fill()
                    render.lineWidth = 1
                    render.strokeStyle = '#222'
                    render.stroke()
                }
            },
            renderTextureBone: function(sender, render) {
                // 绘制框
                const rect = sender.getRectInLocal()
                if (rect.height > 0 && rect.width > 0) {
                    render.beginPath()
                    render.rect(rect.left + 0.5, rect.top + 0.5, rect.width - 1, rect.height - 1)
                    render.lineWidth = 1
                    render.strokeStyle = '#ff0'
                    render.stroke()
                }
            }
        }

        const InnerGBone = ULangUtil.extend(CNode)

        InnerGBone.prototype.defWidth = 0
        InnerGBone.prototype.defHeight = 0
        InnerGBone.prototype.defLayer = 1
        InnerGBone.prototype.init = function(conf) {
            this.super('init', [conf])
            this.defineNotifyProperty('type', ULangUtil.checkAndGet(conf.type, 1))

            this._textureBone = new CNode({ visible: false })
            this.appendChildNodeToLayer(this._textureBone, 0)

            functions.syncType.call(this, this, this.type, 1)
        }

        InnerGBone.prototype.getTextureBone = function() {
            return this._textureBone
        }

        InnerGBone.prototype.checkEventInteractZone = function(name, e, x, y) {
            if (this.type === 1) {
                const rect = this.getRectInLocal()
                const left = (rect.left < -5) ? rect.left : -5
                const right = (rect.right > 5) ? rect.right : 5
                const top = (rect.top < -5) ? rect.top : -5
                const bottom = (rect.bottom > 5) ? rect.bottom : 5
                if (x >= left && x <= right && y >= top && y <= bottom) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        }

        return InnerGBone
    })()

    const GNodeCtrl = (function() {
        const InnerGNodeCtrl = ULangUtil.extend(GCtrl)

        InnerGNodeCtrl.prototype.defLayer = 1
        InnerGNodeCtrl.prototype.init = function(conf) {
            this.super('init', [conf])

            this._textureCtrl = new GCtrl({ x: 0, y: 0, anchorX: 0.5, anchorY: 0.5, width: 0, height: 0, visible: true, ctrlLayer: 0 })

            this.appendChildNodeToLayer(this._textureCtrl, 0)
        }

        InnerGNodeCtrl.prototype.getTextureCtrl = function() {
            return this._textureCtrl
        }

        return InnerGNodeCtrl
    })()

    const GNodeBinder = (function() {
        const functions = (function() {
            let syncing = false

            function syncNodeTransProperty(sender, property, eventName, newVal, oldVal) {
                if (!syncing) {
                    syncing = true
                    if (sender === this._node) {
                        this._nodeBone[property] = newVal
                        this._textureBone[property] = newVal
                        this._nodeTextureCtrl[property] = newVal
                        this.postNotification(eventName, this, [newVal, oldVal])
                    } else if (sender === this._nodeBone) {
                        this._node[property] = newVal
                        this._textureBone[property] = newVal
                        this._nodeTextureCtrl[property] = newVal
                        this.postNotification(eventName, this, [newVal, oldVal])
                    } else if (sender === this._textureBone) {
                        this._node[property] = newVal
                        this._nodeBone[property] = newVal
                        this._nodeTextureCtrl[property] = newVal
                        this.postNotification(eventName, this, [newVal, oldVal])
                    } else if (sender === this._nodeTextureCtrl) {
                        this._node[property] = newVal
                        this._nodeBone[property] = newVal
                        this._textureBone[property] = newVal
                        this.postNotification(eventName, this, [newVal, oldVal])
                    }
                    syncing = false
                }
            }

            function syncNodeX(sender, newVal, oldVal) {
                syncNodeTransProperty.call(this, sender, 'x', 'nodeXChanged', newVal, oldVal)
            }

            function syncNodeY(sender, newVal, oldVal) {
                syncNodeTransProperty.call(this, sender, 'y', 'nodeYChanged', newVal, oldVal)
            }

            function syncNodeRotateZ(sender, newVal, oldVal) {
                syncNodeTransProperty.call(this, sender, 'rotateZ', 'nodeRotateZChanged', newVal, oldVal)
            }

            function syncNodeScaleX(sender, newVal, oldVal) {
                syncNodeTransProperty.call(this, sender, 'scaleX', 'nodeScaleXChanged', newVal, oldVal)
            }

            function syncNodeScaleY(sender, newVal, oldVal) {
                syncNodeTransProperty.call(this, sender, 'scaleY', 'nodeScaleYChanged', newVal, oldVal)
            }

            function syncNodeInclineX(sender, newVal, oldVal) {
                syncNodeTransProperty.call(this, sender, 'shearX', 'nodeInclineXChanged', newVal, oldVal)
            }

            function syncNodeInclineY(sender, newVal, oldVal) {
                syncNodeTransProperty.call(this, sender, 'shearY', 'nodeInclineYChanged', newVal, oldVal)
            }

            function syncNodeImg(sender, newVal, oldVal) {
                this.postNotification('nodeImgChanged', this, [newVal, oldVal])
            }

            function syncTextureTransProperty(sender, property, eventName, newVal, oldVal) {
                if (!syncing) {
                    syncing = true
                    if (sender === this._node.getTexture()) {
                        this._nodeBone.getTextureBone()[property] = newVal
                        this._textureBone.getTextureBone()[property] = newVal
                        this._nodeTextureCtrl.getTextureCtrl()[property] = newVal
                        this.postNotification(eventName, this, [newVal, oldVal])
                    } else if (sender === this._nodeBone.getTextureBone()) {
                        this._node.getTexture()[property] = newVal
                        this._textureBone.getTextureBone()[property] = newVal
                        this._nodeTextureCtrl.getTextureCtrl()[property] = newVal
                        this.postNotification(eventName, this, [newVal, oldVal])
                    } else if (sender === this._textureBone.getTextureBone()) {
                        this._node.getTexture().x = newVal
                        this._nodeBone.getTextureBone()[property] = newVal
                        this._nodeTextureCtrl.getTextureCtrl()[property] = newVal
                        this.postNotification(eventName, this, [newVal, oldVal])
                    } else if (sender === this._nodeTextureCtrl.getTextureCtrl()) {
                        this._node.getTexture()[property] = newVal
                        this._nodeBone.getTextureBone()[property] = newVal
                        this._textureBone.getTextureBone()[property] = newVal
                        this.postNotification(eventName, this, [newVal, oldVal])
                    }
                    syncing = false
                }
            }

            function syncTextureX(sender, newVal, oldVal) {
                syncTextureTransProperty.call(this, sender, 'x', 'textureXChanged', newVal, oldVal)
            }

            function syncTextureY(sender, newVal, oldVal) {
                syncTextureTransProperty.call(this, sender, 'y', 'textureYChanged', newVal, oldVal)
            }

            function syncTextureRotateZ(sender, newVal, oldVal) {
                syncTextureTransProperty.call(this, sender, 'rotateZ', 'textureRotateZChanged', newVal, oldVal)
            }

            function syncTextureScaleX(sender, newVal, oldVal) {
                syncTextureTransProperty.call(this, sender, 'scaleX', 'textureScaleXChanged', newVal, oldVal)
            }

            function syncTextureScaleY(sender, newVal, oldVal) {
                syncTextureTransProperty.call(this, sender, 'scaleY', 'textureScaleYChanged', newVal, oldVal)
            }

            function syncTextureInclineX(sender, newVal, oldVal) {
                syncTextureTransProperty.call(this, sender, 'shearX', 'textureInclineXChanged', newVal, oldVal)
            }

            function syncTextureInclineY(sender, newVal, oldVal) {
                syncTextureTransProperty.call(this, sender, 'shearY', 'textureInclineYChanged', newVal, oldVal)
            }

            function syncTextureNonTransProperty(sender, property, eventName, newVal, oldVal) {
                if (!syncing) {
                    syncing = true
                    if (sender === this._node.getTexture()) {
                        this._textureBone.getTextureBone()[property] = newVal
                        this.postNotification(eventName, this, [newVal, oldVal])
                    } else if (sender === this._textureBone.getTextureBone()) {
                        this._node.getTexture()[property] = newVal
                        this.postNotification(eventName, this, [newVal, oldVal])
                    }
                    syncing = false
                }
            }

            function syncTextureWidth(sender, newVal, oldVal) {
                syncTextureNonTransProperty.call(this, sender, 'width', 'textureWidthChanged', newVal, oldVal)
            }

            function syncTextureHeight(sender, newVal, oldVal) {
                syncTextureNonTransProperty.call(this, sender, 'height', 'textureHeightChanged', newVal, oldVal)
            }

            function syncTextureAnchorX(sender, newVal, oldVal) {
                syncTextureNonTransProperty.call(this, sender, 'anchorX', 'textureAnchorXChanged', newVal, oldVal)
            }

            function syncTextureAnchorY(sender, newVal, oldVal) {
                syncTextureNonTransProperty.call(this, sender, 'anchorY', 'textureAnchorYChanged', newVal, oldVal)
            }

            function syncTextureImg(sender, newVal, oldVal) {
                this.postNotification('textureImgChanged', this, [newVal, oldVal])
            }

            function initNodeTransform(node) {
                syncNodeX.call(this, node, node.x, 0)
                syncNodeY.call(this, node, node.y, 0)
                syncNodeRotateZ.call(this, node, node.rotateZ, 0)
                syncNodeScaleX.call(this, node, node.scaleX, 0)
                syncNodeScaleY.call(this, node, node.scaleY, 0)
                syncNodeInclineX.call(this, node, node.shearX, 0)
                syncNodeInclineY.call(this, node, node.shearY, 0)
                syncNodeImg.call(this, node, node.img, null)
            }

            function regNodeTransform(node) {
                node.addObserver('xChanged', syncNodeX, this, node)
                node.addObserver('yChanged', syncNodeY, this, node)
                node.addObserver('rotateZChanged', syncNodeRotateZ, this, node)
                node.addObserver('scaleXChanged', syncNodeScaleX, this, node)
                node.addObserver('scaleYChanged', syncNodeScaleY, this, node)
                node.addObserver('shearXChanged', syncNodeInclineX, this, node)
                node.addObserver('shearYChanged', syncNodeInclineY, this, node)
                node.addObserver('imgChanged', syncNodeImg, this, node)
            }

            function initTextureTransform(texture) {
                syncTextureX.call(this, texture, texture.x, 0)
                syncTextureY.call(this, texture, texture.y, 0)
                syncTextureRotateZ.call(this, texture, texture.rotateZ, 0)
                syncTextureScaleX.call(this, texture, texture.scaleX, 0)
                syncTextureScaleY.call(this, texture, texture.scaleY, 0)
                syncTextureInclineX.call(this, texture, texture.shearX, 0)
                syncTextureInclineY.call(this, texture, texture.shearY, 0)
                syncTextureWidth.call(this, texture, texture.width, 0)
                syncTextureHeight.call(this, texture, texture.height, 0)
                syncTextureAnchorX.call(this, texture, texture.anchorX, 0)
                syncTextureAnchorY.call(this, texture, texture.anchorY, 0)
                syncTextureImg.call(this, texture, texture.img, null)
            }

            function regTextureTransform(texture) {
                texture.addObserver('xChanged', syncTextureX, this, texture)
                texture.addObserver('yChanged', syncTextureY, this, texture)
                texture.addObserver('rotateZChanged', syncTextureRotateZ, this, texture)
                texture.addObserver('scaleXChanged', syncTextureScaleX, this, texture)
                texture.addObserver('scaleYChanged', syncTextureScaleY, this, texture)
                texture.addObserver('shearXChanged', syncTextureInclineX, this, texture)
                texture.addObserver('shearYChanged', syncTextureInclineY, this, texture)
                texture.addObserver('widthChanged', syncTextureWidth, this, texture)
                texture.addObserver('heightChanged', syncTextureHeight, this, texture)
                texture.addObserver('anchorXChanged', syncTextureAnchorX, this, texture)
                texture.addObserver('anchorYChanged', syncTextureAnchorY, this, texture)
                texture.addObserver('imgChanged', syncTextureImg, this, texture)
            }

            function nodeBoneMouseDown(sender, e) {
                const nodeCtrl = this._nodeTextureCtrl
                const textureCtrl = nodeCtrl.getTextureCtrl()
                if (this._textureBone.visible) {
                    if (textureCtrl.mode !== 0) {
                        nodeCtrl.mode = textureCtrl.mode
                        textureCtrl.mode = 0
                    }
                }
                this.postNotification('nodeMouseDown', this, [e])
            }

            function textureBoneMouseDown(sender, e) {
                const nodeCtrl = this._nodeTextureCtrl
                const textureCtrl = nodeCtrl.getTextureCtrl()
                if (this._textureBone.visible) {
                    if (nodeCtrl.mode !== 0) {
                        textureCtrl.mode = nodeCtrl.mode
                        nodeCtrl.mode = 0
                    }
                }
                this.postNotification('textureMouseDown', this, [e])
            }

            return {
                initNodeTransform: initNodeTransform,
                regNodeTransform: regNodeTransform,
                initTextureTransform: initTextureTransform,
                regTextureTransform: regTextureTransform,

                nodeBoneMouseDown: nodeBoneMouseDown,
                textureBoneMouseDown: textureBoneMouseDown
            }
        })()

        const InnerGNodeBinder = ULangUtil.extend(CNotifier)

        InnerGNodeBinder.prototype.init = function(conf) {
            this.super('init', [conf])
            this.defineNotifyProperty('id', ULangUtil.checkAndGet(conf.id, null))
            this.defineNotifyProperty('parent', null)
            this.defineNotifyProperty('childBinders', [])

            this._node = new GNode(ULangUtil.checkAndGet(conf.node, {}))
            this._nodeBone = new GBone(ULangUtil.checkAndGet(conf.bone, {}))
            this._textureBone = new GBone({ type: 2 })
            this._nodeTextureCtrl = new GNodeCtrl({ ctrlLayer: 1, defLayer: 2 })

            const n = this._node
            const nb = this._nodeBone
            const tb = this._textureBone
            const ntc = this._nodeTextureCtrl

            const nTexture = n.getTexture()
            const nbTexture = nb.getTextureBone()
            const tbTexture = tb.getTextureBone()
            const ntcTexture = ntc.getTextureCtrl()

            functions.initNodeTransform.call(this, n)
            functions.initTextureTransform.call(this, nTexture)

            functions.regNodeTransform.call(this, n)
            functions.regNodeTransform.call(this, nb)
            functions.regNodeTransform.call(this, tb)
            functions.regNodeTransform.call(this, ntc)

            functions.regTextureTransform.call(this, nTexture)
            functions.regTextureTransform.call(this, nbTexture)
            functions.regTextureTransform.call(this, tbTexture)
            functions.regTextureTransform.call(this, ntcTexture)

            nb.addObserver('mousedown', functions.nodeBoneMouseDown, this, nb)
            tbTexture.addObserver('mousedown', functions.textureBoneMouseDown, this, tbTexture)
        }

        InnerGNodeBinder.prototype.getNode = function() {
            return this._node
        }

        InnerGNodeBinder.prototype.getNodeBone = function() {
            return this._nodeBone
        }

        InnerGNodeBinder.prototype.getTextureBone = function() {
            return this._textureBone
        }

        InnerGNodeBinder.prototype.getNodeTextureCtrl = function() {
            return this._nodeTextureCtrl
        }

        InnerGNodeBinder.prototype.setSelected = function(selected) {
            this._textureBone.getTextureBone().visible = selected
            if (!selected) {
                const nodeCtrl = this._nodeTextureCtrl
                const textureCtrl = nodeCtrl.getTextureCtrl()
                nodeCtrl.mode = 0
                textureCtrl.mode = 0
            }
        }

        InnerGNodeBinder.prototype.setTransformMode = function(mode) {
            const nodeCtrl = this._nodeTextureCtrl
            const textureCtrl = nodeCtrl.getTextureCtrl()
            if (textureCtrl.mode !== 0) {
                textureCtrl.mode = mode
            } else {
                nodeCtrl.mode = mode
            }
        }

        InnerGNodeBinder.prototype.appendChildBinder = function(binder) {
            // 从以前的父级里面移除
            binder.removeFromParent(false)
                // 添加到新的父级
            this._node.appendChildNode(binder.getNode())
            this._nodeBone.appendChildNode(binder.getNodeBone())
            this._textureBone.appendChildNode(binder.getTextureBone())
            this._nodeTextureCtrl.appendChildNode(binder.getNodeTextureCtrl())
            this.childBinders.push(binder)
            binder.parent = this
        }

        InnerGNodeBinder.prototype.insertChildBinder = function(binder, binderIndex) {
            binder.removeFromParent(false)
            this._node.insertChildNode(binder.getNode(), binderIndex)
            this._nodeBone.insertChildNode(binder.getNodeBone(), binderIndex)
            this._textureBone.insertChildNode(binder.getTextureBone(), binderIndex)
            this._nodeTextureCtrl.insertChildNode(binder.getNodeTextureCtrl(), binderIndex)
            binder.parent = this
            if (binderIndex < this.childBinders.length) {
                this.childBinders.splice(binderIndex, 0, binder)
            } else {
                this.childBinders.push(binder)
            }
        }

        InnerGNodeBinder.prototype.getChildBinderIndex = function(binder) {
            const children = this.childBinders
            for (let i = 0, len = children.length; i < len; ++i) {
                if (children[i] === binder) {
                    return i
                }
            }
            return -1
        }

        InnerGNodeBinder.prototype.removeChildBinder = function(binder, destroy) {
            if (destroy) {
                binder.destroy()
            } else {
                const children = this.childBinders
                for (let i = 0, len = children.length; i < len; ++i) {
                    if (children[i] === binder) {
                        children.splice(i, 1)
                        binder.getNode().removeFromParent(false)
                        binder.getNodeBone().removeFromParent(false)
                        binder.getTextureBone().removeFromParent(false)
                        binder.getNodeTextureCtrl().removeFromParent(false)
                        binder.parent = null
                        return
                    }
                }
            }
        }

        InnerGNodeBinder.prototype.removeFromParent = function(destroy) {
            const parent = this.parent
            if (parent) {
                parent.removeChildBinder(this, destroy)
            }
        }

        InnerGNodeBinder.prototype.destroy = function() {
            // 清除子对象
            while (true) {
                const binder = this.childBinders.pop()
                if (binder === undefined) {
                    break
                } else {
                    binder.destroy()
                }
            }
            // 清除自身
            this.removeFromParent(false)
            this.super('destroy')
        }

        return InnerGNodeBinder
    })()

    const GModelBinder = (function() {
        const functions = (function() {
            function createBinder(conf) {
                const binder = new GNodeBinder(conf)
                if (conf.id) {
                    this._binderMap[conf.id] = binder
                }
                regNodeTextureListener.call(this, binder)
                if (conf.children) {
                    const children = conf.children
                    for (let i = 0, len = children.length; i < len; ++i) {
                        binder.appendChildBinder(createBinder.call(this, children[i]))
                    }
                }
                return binder
            }

            function createBinders(conf) {
                if (conf) {
                    this._binderMap = {}
                    this._binder = createBinder.call(this, conf)
                }
            }

            function runAction() {
                const context = this._actionContext
                if (context.runningAction) {
                    const actions = context.runningAction
                    context.progress = 0
                    for (let i = 0, len = actions.length; i < len; ++i) {
                        context.progress += 1
                        actions[i].node.runAnimation(actions[i].animation, runActionProgress, this, false)
                    }
                }
            }

            function runActionProgress(binder, deltaTime, finish) {
                if (finish) {
                    const context = this._actionContext
                    context.progress -= 1
                    if (context.progress === 0 && context.loop) {
                        runAction.call(this)
                    }
                }
            }

            function regNodeTextureListener(binder) {
                this.postNotification('binderAddToModelBinder', this, [binder])
                binder.addObserver('nodeMouseDown', nodeMouseDown, this, binder)
                binder.addObserver('nodeXChanged', nodeXChanged, this, binder)
                binder.addObserver('nodeYChanged', nodeYChanged, this, binder)
                binder.addObserver('nodeRotateZChanged', nodeRotateZChanged, this, binder)
                binder.addObserver('nodeScaleXChanged', nodeScaleXChanged, this, binder)
                binder.addObserver('nodeScaleYChanged', nodeScaleYChanged, this, binder)
                binder.addObserver('nodeInclineXChanged', nodeInclineXChanged, this, binder)
                binder.addObserver('nodeInclineYChanged', nodeInclineYChanged, this, binder)
                binder.addObserver('nodeImgChanged', nodeImgChanged, this, binder)
                binder.addObserver('textureMouseDown', textureMouseDown, this, binder)
                binder.addObserver('textureXChanged', textureXChanged, this, binder)
                binder.addObserver('textureYChanged', textureYChanged, this, binder)
                binder.addObserver('textureRotateZChanged', textureRotateZChanged, this, binder)
                binder.addObserver('textureScaleXChanged', textureScaleXChanged, this, binder)
                binder.addObserver('textureScaleYChanged', textureScaleYChanged, this, binder)
                binder.addObserver('textureInclineXChanged', textureInclineXChanged, this, binder)
                binder.addObserver('textureInclineYChanged', textureInclineYChanged, this, binder)
                binder.addObserver('textureWidthChanged', textureWidthChanged, this, binder)
                binder.addObserver('textureHeightChanged', textureHeightChanged, this, binder)
                binder.addObserver('textureAnchorXChanged', textureAnchorXChanged, this, binder)
                binder.addObserver('textureAnchorYChanged', textureAnchorYChanged, this, binder)
                binder.addObserver('textureImgChanged', textureImgChanged, this, binder)
                const listener = this._listeners['binderAddToModelBinder']
                if (listener) {
                    listener.func.call(listener.target, binder)
                }
            }

            function unRegNodeTextureListener(binder) {
                binder.removeObserver('nodeMouseDown', nodeMouseDown, this, binder)
                binder.removeObserver('nodeXChanged', nodeXChanged, this, binder)
                binder.removeObserver('nodeYChanged', nodeYChanged, this, binder)
                binder.removeObserver('nodeRotateZChanged', nodeRotateZChanged, this, binder)
                binder.removeObserver('nodeScaleXChanged', nodeScaleXChanged, this, binder)
                binder.removeObserver('nodeScaleYChanged', nodeScaleYChanged, this, binder)
                binder.removeObserver('nodeInclineXChanged', nodeInclineXChanged, this, binder)
                binder.removeObserver('nodeInclineYChanged', nodeInclineYChanged, this, binder)
                binder.removeObserver('nodeImgChanged', nodeImgChanged, this, binder)
                binder.removeObserver('textureMouseDown', textureMouseDown, this, binder)
                binder.removeObserver('textureXChanged', textureXChanged, this, binder)
                binder.removeObserver('textureYChanged', textureYChanged, this, binder)
                binder.removeObserver('textureRotateZChanged', textureRotateZChanged, this, binder)
                binder.removeObserver('textureScaleXChanged', textureScaleXChanged, this, binder)
                binder.removeObserver('textureScaleYChanged', textureScaleYChanged, this, binder)
                binder.removeObserver('textureInclineXChanged', textureInclineXChanged, this, binder)
                binder.removeObserver('textureInclineYChanged', textureInclineYChanged, this, binder)
                binder.removeObserver('textureWidthChanged', textureWidthChanged, this, binder)
                binder.removeObserver('textureHeightChanged', textureHeightChanged, this, binder)
                binder.removeObserver('textureAnchorXChanged', textureAnchorXChanged, this, binder)
                binder.removeObserver('textureAnchorYChanged', textureAnchorYChanged, this, binder)
                binder.removeObserver('textureImgChanged', textureImgChanged, this, binder)
                const listener = this._listeners['binderRemoveFromModelBinder']
                if (listener) {
                    listener.func.call(listener.target, binder)
                }
            }

            function nodeMouseDown(sender, e) {
                e.bubble = false
                const listener = this._listeners['nodeMouseDown']
                if (listener) {
                    listener.func.call(listener.target, sender, e)
                }
            }

            function nodeXChanged(sender, newVal, oldVal) {
                const listener = this._listeners['nodeXChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function nodeYChanged(sender, newVal, oldVal) {
                const listener = this._listeners['nodeYChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function nodeRotateZChanged(sender, newVal, oldVal) {
                const listener = this._listeners['nodeRotateZChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function nodeScaleXChanged(sender, newVal, oldVal) {
                const listener = this._listeners['nodeScaleXChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function nodeScaleYChanged(sender, newVal, oldVal) {
                const listener = this._listeners['nodeScaleYChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function nodeInclineXChanged(sender, newVal, oldVal) {
                const listener = this._listeners['nodeInclineXChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function nodeInclineYChanged(sender, newVal, oldVal) {
                const listener = this._listeners['nodeInclineYChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function nodeImgChanged(sender, newVal, oldVal) {
                const listener = this._listeners['nodeImgChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function textureMouseDown(sender, e) {
                e.bubble = false
                const listener = this._listeners['textureMouseDown']
                if (listener) {
                    listener.func.call(listener.target, sender, e)
                }
            }

            function textureXChanged(sender, newVal, oldVal) {
                const listener = this._listeners['textureXChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function textureYChanged(sender, newVal, oldVal) {
                const listener = this._listeners['textureYChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function textureRotateZChanged(sender, newVal, oldVal) {
                const listener = this._listeners['textureRotateZChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function textureScaleXChanged(sender, newVal, oldVal) {
                const listener = this._listeners['textureScaleXChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function textureScaleYChanged(sender, newVal, oldVal) {
                const listener = this._listeners['textureScaleYChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function textureInclineXChanged(sender, newVal, oldVal) {
                const listener = this._listeners['textureInclineXChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function textureInclineYChanged(sender, newVal, oldVal) {
                const listener = this._listeners['textureInclineYChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function textureWidthChanged(sender, newVal, oldVal) {
                const listener = this._listeners['textureWidthChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function textureHeightChanged(sender, newVal, oldVal) {
                const listener = this._listeners['textureHeightChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function textureAnchorXChanged(sender, newVal, oldVal) {
                const listener = this._listeners['textureAnchorXChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function textureAnchorYChanged(sender, newVal, oldVal) {
                const listener = this._listeners['textureAnchorYChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            function textureImgChanged(sender, newVal, oldVal) {
                const listener = this._listeners['textureImgChanged']
                if (listener) {
                    listener.func.call(listener.target, sender, newVal, oldVal)
                }
            }

            return {
                createBinders: createBinders,
                runAction: runAction,
                regNodeTextureListener: regNodeTextureListener,
                unRegNodeTextureListener: unRegNodeTextureListener
            }
        })()

        const InnerGModelBinder = ULangUtil.extend(CNotifier)

        InnerGModelBinder.prototype.init = function(conf) {
            this.super('init', [conf])
            this.defineNotifyProperty('id', null)

            this._binder = null
            this._binderMap = null
            this._listeners = ULangUtil.checkAndGet(conf.listeners, {})

            this._actionContext = {
                runningAction: [],
                progress: 0,
                loop: false
            }
            this._nodeEditContext = {
                selectedBinder: null,
                transformMode: 0
            }
        }

        InnerGModelBinder.prototype.load = function(modelData) {
            if (this._binder) {
                this._binder.destroy()
                this._binder = null
                this._binderMap = null
            }
            this.id = ULangUtil.checkAndGet(modelData.id, null)
            functions.createBinders.call(this, ULangUtil.checkAndGet(modelData.root, null))
        }

        InnerGModelBinder.prototype.getBinder = function() {
            return this._binder
        }

        InnerGModelBinder.prototype.addBinder = function(binder, parentBinderId) {
            const parentBinder = this._binderMap[parentBinderId]
            if (!parentBinder) {
                console.warn('Can not find parent binder:' + parentBinderId)
            } else {
                parentBinder.appendChildBinder(binder)
                this._binderMap[binder.id] = binder
                functions.regNodeTextureListener.call(this, binder)
            }
        }

        InnerGModelBinder.prototype.insertBinderBefore = function(binder, parentBinderId, nextBinderId) {
            const parentBinder = this._binderMap[parentBinderId]
            if (!parentBinder) {
                console.warn('Can not find parent binder:' + parentBinderId)
                return
            }
            const nextBinder = this._binderMap[nextBinderId]
            if (!nextBinder) {
                console.warn('Can not find next binder:' + nextBinderId)
                return
            }
            const index = parentBinder.getChildBinderIndex(nextBinder)
            if (index < 0) {
                console.warn('Can not find next node:' + nextBinderId + '  in parent node:' + parentBinderId)
                return
            }
            parentBinder.insertChildBinder(binder, index)
            this._binderMap[binder.id] = binder
            functions.regNodeTextureListener.call(this, binder)
        }

        InnerGModelBinder.prototype.insertBinderAfter = function(binder, parentBinderId, prevBinderId) {
            const parentBinder = this._binderMap[parentBinderId]
            if (!parentBinder) {
                console.warn('Can not find parent binder:' + parentBinderId)
                return
            }
            const prevBinder = this._binderMap[prevBinderId]
            if (!prevBinder) {
                console.warn('Can not find prev binder:' + prevBinderId)
                return
            }
            const index = parentBinder.getChildBinderIndex(prevBinder)
            if (index < 0) {
                console.warn('Can not find prev node:' + prevBinderId + '  in parent node:' + parentBinderId)
                return
            }
            parentBinder.insertChildBinder(binder, index + 1)
            this._binderMap[binder.id] = binder
            functions.regNodeTextureListener.call(this, binder)
        }

        InnerGModelBinder.prototype.removeBinder = function(binderId, destroy) {
            const binder = this._binderMap[binderId]
            if (!binder) {
                return null
            }
            binder.removeFromParent(destroy)
            delete this._binderMap[binderId]
            functions.unRegNodeTextureListener.call(this, binder)
            return binder
        }

        InnerGModelBinder.prototype.selectBinder = function(binderId) {
            const context = this._nodeEditContext
            const binder = this._binderMap[binderId]
            if (context.selectedBinder !== binder) {
                if (context.selectedBinder) {
                    context.selectedBinder.setSelected(false)
                }
                if (binder) {
                    context.selectedBinder = binder
                    binder.setSelected(true)
                    binder.setTransformMode(context.transformMode)
                }
            }
        }

        InnerGModelBinder.prototype.setTransformMode = function(mode) {
            const context = this._nodeEditContext
            context.transformMode = mode
            if (context.selectedBinder) {
                context.selectedBinder.setTransformMode(mode)
            }
        }

        InnerGModelBinder.prototype.setListener = function(name, func, target) {
            this._listeners[name] = {
                func: func,
                target: target
            }
        }

        InnerGModelBinder.prototype.setNodeProperty = function(binderId, name, property) {
            const binder = this._binderMap[binderId]
            if (binder) {
                binder.getNode()[name] = property
            }
        }

        InnerGModelBinder.prototype.getNodeProperties = function(binderId) {
            const binder = this._binderMap[binderId]
            if (binder) {
                const node = binder.getNode()
                return {
                    x: node.x,
                    y: node.y,
                    rotateZ: node.rotateZ,
                    scaleX: node.scaleX,
                    scaleY: node.scaleY,
                    shearX: node.shearX,
                    shearY: node.shearY,
                    alpha: node.alpha,
                    visible: node.visible,
                    img: node.img
                }
            } else {
                return null
            }
        }

        InnerGModelBinder.prototype.setNodeTextureProperty = function(binderId, name, value) {
            const binder = this._binderMap[binderId]
            if (binder) {
                binder.getNode().getTexture()[name] = value
            }
        }

        InnerGModelBinder.prototype.getNodeTextureProperties = function(binderId) {
            const binder = this._binderMap[binderId]
            if (binder) {
                const texture = binder.getNode().getTexture()
                return {
                    x: texture.x,
                    y: texture.y,
                    rotateZ: texture.rotateZ,
                    scaleX: texture.scaleX,
                    scaleY: texture.scaleY,
                    shearX: texture.shearX,
                    shearY: texture.shearY,
                    alpha: texture.alpha,
                    visible: texture.visible,
                    img: texture.img
                }
            } else {
                return null
            }
        }

        InnerGModelBinder.prototype.runAction = function(modelFrames, loop) {
            this.stopAction()
            const nodeAnimations = []
            for (const nodeId in modelFrames) {
                const binder = this._binderMap[nodeId]
                const nodeFrames = modelFrames[nodeId]
                if (binder && nodeFrames) {
                    var animation = GUtil.compileModelFrames(binder.getNode(), nodeFrames, binder === this._binder)
                    if (animation) {
                        nodeAnimations.push({
                            node: binder.getNode(),
                            animation: animation
                        })
                    }
                }
            }
            if (nodeAnimations.length > 0) {
                this._actionContext.runningAction = nodeAnimations
                this._actionContext.loop = loop
                functions.runAction.call(this)
            }
        }

        InnerGModelBinder.prototype.stopAction = function() {
            this._actionContext.runningAction = []
            this._actionContext.progress = 0
            this._actionContext.loop = false
            this._binder.getNode().stopAllAnimation(true)
        }

        InnerGModelBinder.prototype.destroy = function() {
            this._binder.destroy()
            this._binderMap = null
            this._actionContext = null
            this.super('destroy')
        }

        return InnerGModelBinder
    })()

    const GModelEditor = (function() {
        const functions = (function() {
            function syncContextSize(sender, width, height) {
                this._scene.width = width
                this._scene.height = height
                this._scene.x = Math.round(width / 2)
                this._scene.y = Math.round(height / 2)
            }

            return {
                syncContextSize: syncContextSize
            }
        })()

        const GInnerModelEditor = ULangUtil.extend(CNotifier)

        GInnerModelEditor.prototype.init = function(conf) {
            this.super('init', [conf])
            this._map = new GMap({
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                anchorX: 0.5,
                anchorY: 0.5
            })
            this._scene = new GScene({
                x: 0,
                y: 0,
                anchorX: 0.5,
                anchorY: 0.5,
                map: this._map
            })
            this._context = new CApplication({
                root: this._scene,
                canvas: conf.canvas,
                enableDirtyZone: true
            })
            this._modelBinder = new GModelBinder({ listeners: conf.listeners })
            this._context.addObserver('resize', functions.syncContextSize, this, this._context)
        }

        GInnerModelEditor.prototype.load = function(data) {
            this._modelBinder.load(data)
            this._map.appendChildNodeToLayer(this._modelBinder.getBinder().getNode(), 0)
            this._map.appendChildNodeToLayer(this._modelBinder.getBinder().getTextureBone(), 1)
            this._map.appendChildNodeToLayer(this._modelBinder.getBinder().getNodeBone(), 2)
            this._map.appendChildNodeToLayer(this._modelBinder.getBinder().getNodeTextureCtrl(), 3)
        }

        GInnerModelEditor.prototype.createBinder = function(binderConf) {
            return new GNodeBinder(binderConf)
        }

        GInnerModelEditor.prototype.addBinder = function(binder, parentNodeId) {
            if (this._modelBinder) {
                this._modelBinder.addBinder(binder, parentNodeId)
            }
        }

        GInnerModelEditor.prototype.insertBinderBefore = function(binder, parentNodeId, nextNodeId) {
            if (this._modelBinder) {
                this._modelBinder.insertBinderBefore(binder, parentNodeId, nextNodeId)
            }
        }

        GInnerModelEditor.prototype.insertBinderAfter = function(binder, parentNodeId, prevNodeId) {
            if (this._modelBinder) {
                this._modelBinder.insertBinderAfter(binder, parentNodeId, prevNodeId)
            }
        }

        GInnerModelEditor.prototype.removeBinder = function(binderId, destroy) {
            if (this._modelBinder) {
                return this._modelBinder.removeBinder(binderId, destroy)
            } else {
                return null
            }
        }

        GInnerModelEditor.prototype.selectBinder = function(binderId) {
            if (this._modelBinder) {
                this._modelBinder.selectBinder(binderId)
            }
        }

        GInnerModelEditor.prototype.setTransformMode = function(mode) {
            if (this._modelBinder) {
                this._modelBinder.setTransformMode(mode)
            }
        }

        GInnerModelEditor.prototype.setListener = function(name, func, target) {
            if (this._modelBinder) {
                this._modelBinder.setListener(name, func, target)
            }
        }

        GInnerModelEditor.prototype.setNodeProperty = function(binderId, name, value) {
            if (this._modelBinder) {
                this._modelBinder.setNodeProperty(binderId, name, value)
            }
        }

        GInnerModelEditor.prototype.getNodeProperties = function(binderId, name, value) {
            if (this._modelBinder) {
                return this._modelBinder.getNodeProperties(binderId)
            }
        }

        GInnerModelEditor.prototype.setNodeTextureProperty = function(binderId, name, value) {
            if (this._modelBinder) {
                return this._modelBinder.setNodeTextureProperty(binderId, name, value)
            }
        }

        GInnerModelEditor.prototype.getNodeTextureProperties = function(binderId) {
            if (this._modelBinder) {
                return this._modelBinder.getNodeTextureProperties(binderId)
            }
        }

        GInnerModelEditor.prototype.runAction = function(modelFrames, loop) {
            if (this._modelBinder) {
                this._modelBinder.runAction(modelFrames, loop)
            }
        }

        GInnerModelEditor.prototype.stopAction = function() {
            if (this._modelBinder) {
                this._modelBinder.stopAction()
            }
        }

        GInnerModelEditor.prototype.runContext = function() {
            this._context.run()
        }

        GInnerModelEditor.prototype.stopContext = function() {
            this._context.stop()
        }

        return GInnerModelEditor
    })()

    return GModelEditor
})()