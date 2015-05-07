<?php
/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2015 (original work) Open Assessment Technologies SA (under the project TAO-PRODUCT);
 *
 *
 */

namespace oat\taoQtiItem\model\pack;

use oat\taoItems\model\pack\Packable;
use oat\taoItems\model\pack\ItemPack;
use oat\taoQtiItem\model\qti\Parser as QtiParser;
use oat\taoQtiItem\model\qti\AssetParser;
use \core_kernel_classes_Resource;
use \InvalidArgumentException;
use \common_Exception;

/**
 * This class pack a QTI Item. Packing instead of compiling, aims
 * to extract the only data of an item. Those data are used by the
 * item runner to render the item.
 *
 * @package taoQtiItem
 * @author Bertrand Chevrier <bertrand@taotesting.com>
 */
class QtiItemPacker implements Packable
{

    /**
     * The item type identifier
     * @var string
     */
    private static $itemType = 'qti';

    /**
     * Determines what type of assets should be packed as well as packer
     * @example array('css'=>'base64')
     * @var array
     */
    protected $assetEncoders = array( 'js'    => 'none',
                                      'css'   => 'none',
                                      'font'  => 'none',
                                      'img'   => 'none',
                                      'audio' => 'none',
                                      'video' => 'none');

    protected $nestedResourcesInclusion = true;

    /**
     * packItem implementation for QTI
     * @inheritdoc
     * @see {@link Packable}
     * @throws InvalidArgumentException
     * @throws common_Exception
     */
    public function packItem(core_kernel_classes_Resource $item, $path)
    {
        $itemPack = null;

        $content = $this->getItemContent($path);

        //use the QtiParser to transform the QTI XML into an assoc array representation
        try {

            //load content
            $qtiParser = new QtiParser($content);

            //validate it
            $qtiParser->validate();
            if(!$qtiParser->isValid()){
                throw new common_Exception('Invalid QTI content : ' . $qtiParser->displayErrors(false));
            }

            //parse
            $qtiItem  = $qtiParser->load();

            //then build the ItemPack from the parsed data
            if(!is_null($qtiItem)){
                $itemPack = new ItemPack(self::$itemType, $qtiItem->toArray());

                $itemPack->setAssetEncoders($this->getAssetEncoders());

                $assetParser = new AssetParser($qtiItem, $path);
                $assetParser->setDeepParsing($this->isNestedResourcesInclusion());

                foreach($assetParser->extract($itemPack) as $type => $assets){
                    $itemPack->setAssets($type, $assets , $path);
                }
            }

        } catch(common_Exception $e){
            throw new common_Exception('Unable to pack item '. $item->getUri() . ' : ' . $e->getMessage());
        }

        return $itemPack;
    }

    /**
     * Get QTI Item content.
     * Let this method protected : it's behavior can be changed.
     *
     * @param string $folder the item folder
     * @return string the qti.xml content
     * @throws common_Exception
     */
    protected function getItemContent($folder)
    {
        $file = $folder . DIRECTORY_SEPARATOR . 'qti.xml';
        if(file_exists($file)){
            return file_get_contents($file);
        }
        throw new common_Exception('Unable to retrieve item content at : ' . $file);
    }

    /**
     * @return array
     */
    private function getAssetEncoders()
    {
        return $this->assetEncoders;
    }

    /**
     * @param array $assetEncoders
     */
    public function setAssetEncoders( array $assetEncoders )
    {
        $this->assetEncoders = $assetEncoders;
    }

    /**
     * @return boolean
     */
    public function isNestedResourcesInclusion()
    {
        return $this->nestedResourcesInclusion;
    }

    /**
     * @param boolean $nestedResourcesInclusion
     */
    public function setNestedResourcesInclusion( $nestedResourcesInclusion )
    {
        $this->nestedResourcesInclusion = $nestedResourcesInclusion;
    }
}