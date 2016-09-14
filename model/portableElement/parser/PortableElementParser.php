<?php
/**
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
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
 * Copyright (c) 2016 (original work) Open Assessment Technologies SA;
 *
 */

namespace oat\taoQtiItem\model\portableElement\parser;

interface PortableElementParser
{
    /**
     * Validate the $source as path
     *
     * @param string $source Zip package location to validate
     * @return bool isValid
     */
    public function validate($source);

    /**
     * Handle the $source to fetch information
     * Return a path of directory where information is
     *
     * @param string $source
     * @return string
     */
    public function extract($source);

    /**
     * Check if $source contains a valid portable element
     *
     * @param string $source
     * @return bool
     */
    public function hasValidPortableElement($source);

    /**
     * Get the manifest of portable element package
     *
     * @param string $source
     * @return mixed
     */
    public function getManifestContent($source);
}